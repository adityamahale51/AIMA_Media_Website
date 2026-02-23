const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JsonDB = require('../utils/db');
const { authRequired } = require('../middleware/auth');

const router = express.Router();
const usersDB = new JsonDB('users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'aima-media-jwt-secret-key-2026-secure';

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, membershipId: user.membershipId },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Sanitize user (remove password)
function sanitizeUser(user) {
  const { password, ...safe } = user;
  return safe;
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, state, city, organization, designation, password, confirmPassword } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match!' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters!' });
    }

    // Check existing user
    const existing = usersDB.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists!' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with extended membership fields
    const membershipId = 'IDMA' + Date.now().toString().slice(-6);
    const newUser = usersDB.create({
      firstName,
      lastName,
      email,
      mobile: mobile || '',
      state: state || '',
      city: city || '',
      organization: organization || '',
      designation: designation || '',
      password: hashedPassword,
      membershipId,
      joinedDate: new Date().toLocaleDateString('en-IN'),
      bio: '',
      avatar: '',
      role: 'member',
      membershipStatus: 'pending',
      verification_status: 'pending',
      selectedPlan: null,
      selectedPlanName: null,
      membership_start: null,
      membership_expiry: null,
      linkedin: '',
      website: '',
      skills: '',
      postsCount: 0,
      membersCount: 0,
      viewsCount: 0,
      readersCount: 0,
    });

    const token = generateToken(newUser);
    res.status(201).json({ success: true, token, user: sanitizeUser(newUser) });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find user by email or mobile
    const users = usersDB.findAll();
    const user = users.find(u => u.email === email || u.mobile === email);

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email/mobile or password. Try demo: demo@aimamedia.org / demo123' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email/mobile or password. Try demo: demo@aimamedia.org / demo123' });
    }

    const token = generateToken(user);
    res.json({ success: true, token, user: sanitizeUser(user) });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// GET /api/auth/me
router.get('/me', authRequired, (req, res) => {
  try {
    const user = usersDB.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user: sanitizeUser(user) });
  } catch (err) {
    console.error('Get me error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/auth/profile
router.put('/profile', authRequired, (req, res) => {
  try {
    const { firstName, lastName, email, mobile, state, city, organization, designation, bio, linkedin, website, skills } = req.body;
    const updated = usersDB.update(req.user.id, {
      firstName, lastName, email, mobile, state, city, organization, designation, bio,
      linkedin: linkedin || '', website: website || '', skills: skills || '',
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user: sanitizeUser(updated) });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/auth/verify/:membershipId — Public verification page
router.get('/verify/:membershipId', (req, res) => {
  try {
    const users = usersDB.findAll();
    const user = users.find(u => u.membershipId === req.params.membershipId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Member not found. Invalid membership ID.' });
    }

    // Return only public verification data
    res.json({
      success: true,
      data: {
        name: `${user.firstName} ${user.lastName}`,
        membershipId: user.membershipId,
        tier: user.selectedPlanName || 'Standard',
        validity: user.membership_expiry ? new Date(user.membership_expiry).toLocaleDateString('en-IN') : 'N/A',
        status: user.membershipStatus || 'pending',
        verification_status: user.verification_status || 'pending',
        city: user.city || '',
        state: user.state || '',
        organization: user.organization || '',
        designation: user.designation || '',
        joinedDate: user.joinedDate || '',
        disclaimer: 'This membership does not represent government accreditation. IDMA is a private digital membership network.',
      },
    });
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/auth/digital-id — Get current user's digital ID data
router.get('/digital-id', authRequired, (req, res) => {
  try {
    const user = usersDB.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: {
        name: `${user.firstName} ${user.lastName}`,
        membershipId: user.membershipId,
        tier: user.selectedPlanName || 'Standard',
        validity: user.membership_expiry ? new Date(user.membership_expiry).toLocaleDateString('en-IN') : 'N/A',
        status: user.membershipStatus || 'pending',
        organization: user.organization || '',
        designation: user.designation || '',
        city: user.city || '',
        state: user.state || '',
        avatar: user.avatar || '',
        joinedDate: user.joinedDate || '',
        qrData: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify/${user.membershipId}`,
        disclaimer: 'This membership does not represent government accreditation. IDMA is a private digital membership network.',
      },
    });
  } catch (err) {
    console.error('Digital ID error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
