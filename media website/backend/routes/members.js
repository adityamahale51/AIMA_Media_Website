const express = require('express');
const JsonDB = require('../utils/db');

const router = express.Router();
const membersDB = new JsonDB('members.json');

// GET /api/members — Get all members
router.get('/', (req, res) => {
  try {
    let members = membersDB.findAll();
    const { state } = req.query;
    if (state && state !== 'All') {
      members = members.filter(m => m.state === state);
    }
    res.json({ success: true, data: members });
  } catch (err) {
    console.error('Get members error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/members/active — Get most active members
router.get('/active', (req, res) => {
  try {
    const members = membersDB.findAll();
    // Return members marked as active, or first 6
    const active = members.filter(m => m.isActive).slice(0, 6);
    if (active.length === 0) {
      // Fallback: return first 6 members
      res.json({ success: true, data: members.slice(0, 6) });
    } else {
      res.json({ success: true, data: active });
    }
  } catch (err) {
    console.error('Get active members error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
