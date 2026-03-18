const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET /api/members — Get all members
router.get('/', async (req, res) => {
  try {
    const { state } = req.query;
    let query = { role: 'member', membershipStatus: 'approved' };
    if (state && state !== 'All') {
      query.state = state;
    }
    const members = await User.find(query).select('-password');
    res.json({ success: true, data: members });
  } catch (err) {
    console.error('Get members error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/members/active — Get most active members
router.get('/active', async (req, res) => {
  try {
    // Return first 6 approved members
    const active = await User.find({ role: 'member', membershipStatus: 'approved' }).limit(6).select('-password');
    res.json({ success: true, data: active });
  } catch (err) {
    console.error('Get active members error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
