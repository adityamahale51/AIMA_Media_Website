const express = require('express');
const JsonDB = require('../utils/db');

const router = express.Router();
const contactsDB = new JsonDB('contacts.json');

// POST /api/contact — Submit contact form
router.post('/', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    const contact = contactsDB.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
      status: 'new',
      readAt: null,
    });

    res.status(201).json({ success: true, message: 'Thank you! Your message has been sent successfully. We will get back to you soon.' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, message: 'Server error sending message' });
  }
});

module.exports = router;
