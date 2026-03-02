const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const formatDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const buildMembershipId = async () => {
  for (let i = 0; i < 5; i += 1) {
    const candidate = `AIMA${Date.now().toString().slice(-7)}${Math.floor(Math.random() * 900 + 100)}`;
    const exists = await User.findOne({ membershipId: candidate }).select('_id');
    if (!exists) return candidate;
  }
  return `AIMA${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

const serializeUser = (user) => {
  const firstName = user.firstName || (user.name ? user.name.split(' ')[0] : '');
  const lastName = user.lastName || (user.name ? user.name.split(' ').slice(1).join(' ') : '');
  return {
    id: user._id,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`.trim() || user.name || '',
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    city: user.city || user.district || '',
    state: user.state || '',
    organization: user.organization || '',
    designation: user.designation || '',
    profilePhoto: user.profilePhoto || '',
    membershipId: user.membershipId || '',
    membershipStatus: user.membershipStatus || 'pending',
    selectedPlan: user.selectedPlan || '',
    selectedPlanName: user.selectedPlanName || '',
    membership_expiry: user.membership_expiry || null,
    postsCount: user.postsCount || 0,
    membersCount: user.membersCount || 0,
    viewsCount: user.viewsCount || 0,
    readersCount: user.readersCount || 0,
    linkedin: user.linkedin || '',
    website: user.website || '',
    skills: user.skills || '',
    joinedDate: formatDate(user.joinedDate || user.createdAt),
  };
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      name,
      email,
      mobile,
      password,
      state,
      city,
      organization,
      designation,
    } = req.body;

    if ((!firstName && !name) || !email || !mobile || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const existing = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existing) return res.status(400).json({ success: false, message: 'Email or mobile already in use' });

    const resolvedFirstName = firstName || (name ? name.split(' ')[0] : '');
    const resolvedLastName = lastName || (name ? name.split(' ').slice(1).join(' ') : '');
    const membershipId = await buildMembershipId();

    const user = await User.create({
      firstName: resolvedFirstName,
      lastName: resolvedLastName,
      name: `${resolvedFirstName} ${resolvedLastName}`.trim(),
      email,
      mobile,
      password,
      state: state || '',
      city: city || '',
      district: city || '',
      organization: organization || '',
      designation: designation || '',
      membershipId,
      membershipStatus: 'pending',
    });

    const token = generateToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRE);

    res.status(201).json({
      success: true,
      user: serializeUser(user),
      token,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Please provide email and password' });

    // allow login by email or mobile
    const identifier = email;
    const user = await User.findOne({ $or: [{ email: identifier }, { mobile: identifier }] }).select('+password');
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    if (!user.isActive) return res.status(403).json({ success: false, message: 'Account is inactive' });
    if (user.isBlocked) return res.status(403).json({ success: false, message: 'Account is blocked. Contact support.' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRE);

    res.status(200).json({
      success: true,
      user: serializeUser(user),
      token,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({ success: true, user: serializeUser(user) });
  } catch (err) {
    next(err);
  }
};

// @desc    Get digital ID details for current user
// @route   GET /api/auth/digital-id
// @access  Private
exports.getDigitalId = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const data = {
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name || 'Member',
      designation: user.designation || '',
      organization: user.organization || '',
      tier: user.selectedPlanName || 'Standard',
      status: user.membershipStatus || 'pending',
      membershipId: user.membershipId || '',
      city: user.city || user.district || '',
      state: user.state || '',
      validity: formatDate(user.membership_expiry) || 'N/A',
      joinedDate: formatDate(user.joinedDate || user.createdAt),
      qrData: `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify/${user.membershipId || user._id}`,
      disclaimer: 'This membership does not represent government accreditation. This is an official IDMA digital membership card and is subject to verification.',
    };

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// @desc    Public verification by membership id
// @route   GET /api/auth/verify/:membershipId
// @access  Public
exports.verifyMembership = async (req, res, next) => {
  try {
    const { membershipId } = req.params;
    const user = await User.findOne({ membershipId });
    if (!user) return res.status(404).json({ success: false, message: 'Membership ID not found' });

    const data = {
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name || 'Member',
      designation: user.designation || '',
      organization: user.organization || '',
      tier: user.selectedPlanName || 'Standard',
      status: user.membershipStatus || 'pending',
      membershipId: user.membershipId || '',
      city: user.city || user.district || '',
      state: user.state || '',
      validity: formatDate(user.membership_expiry) || 'N/A',
      joinedDate: formatDate(user.joinedDate || user.createdAt),
      disclaimer: 'This membership does not represent government accreditation. Verification reflects current status at the time of lookup.',
    };

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
