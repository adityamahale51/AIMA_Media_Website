const Contact = require('../models/Contact');

exports.sendContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    await Contact.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you soon.',
    });
  } catch (err) {
    next(err);
  }
};
