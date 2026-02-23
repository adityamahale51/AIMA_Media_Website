const express = require('express');
const JsonDB = require('../utils/db');

const router = express.Router();
const galleryDB = new JsonDB('gallery.json');

// GET /api/gallery — Get all gallery images
router.get('/', (req, res) => {
  try {
    const images = galleryDB.findAll();
    res.json({ success: true, data: images });
  } catch (err) {
    console.error('Get gallery error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
