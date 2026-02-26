const User = require('../models/User');

const mapMember = (u) => {
  const name = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.name || 'Member';
  const location = [u.city || u.district || '', u.state || ''].filter(Boolean).join(', ');
  return {
    id: u._id,
    name,
    location,
    avatar: u.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e3a5f&color=fff`,
    role: u.designation || 'Member',
    shortName: '@',
  };
};

exports.getMembers = async (req, res, next) => {
  try {
    const state = req.query.state;
    const query = { role: 'member', membershipStatus: 'approved' };
    if (state && state !== 'All') query.state = state;
    const members = await User.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: members.map(mapMember) });
  } catch (err) {
    next(err);
  }
};

exports.getActiveMembers = async (req, res, next) => {
  try {
    const members = await User.find({ role: 'member', membershipStatus: 'approved' })
      .sort({ postsCount: -1, createdAt: -1 })
      .limit(8);
    res.json({ success: true, data: members.map(mapMember) });
  } catch (err) {
    next(err);
  }
};
