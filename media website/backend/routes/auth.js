const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { authRequired } = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'idmf-media-jwt-secret-key-2026-secure';

// Transporter for sending emails
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, membershipId: user.membershipId },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Sanitize user (remove password)
function sanitizeUser(user) {
  const userObj = user.toObject();
  const { password, resetPasswordToken, resetPasswordExpire, ...safe } = userObj;
  safe.id = userObj._id.toString();
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
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists!' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with extended membership fields
    const membershipId = 'IDMF' + Date.now().toString().slice(-6);
    const newUser = await User.create({
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
      role: 'member',
      membershipStatus: 'pending',
      verification_status: 'pending',
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
    const user = await User.findOne({ $or: [{ email: email }, { mobile: email }] });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email/mobile or password. Try demo: demo@idmfmedia.org / demo123' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email/mobile or password. Try demo: demo@idmfmedia.org / demo123' });
    }

    const token = generateToken(user);
    res.json({ success: true, token, user: sanitizeUser(user) });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// GET /api/auth/me
router.get('/me', authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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
router.put('/profile', authRequired, async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, state, city, organization, designation, bio, linkedin, website, skills } = req.body;
    const updated = await User.findByIdAndUpdate(req.user.id, {
      firstName, lastName, email, mobile, state, city, organization, designation, bio,
      linkedin: linkedin || '', website: website || '', skills: skills || '',
    }, { new: true });
    
    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user: sanitizeUser(updated) });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'There is no user with that email' });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await transporter.sendMail({
        from: `"${process.env.FROM_NAME || 'IDMF Media'}" <${process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Password reset token',
        text: message,
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.error('Email send error:', err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/auth/reset-password/:resettoken
router.put('/reset-password/:resettoken', async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    // Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, data: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/auth/verify/:membershipId — Public verification page
router.get('/verify/:membershipId', async (req, res) => {
  try {
    const user = await User.findOne({ membershipId: req.params.membershipId });

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
        disclaimer: 'This membership does not represent government accreditation. IDMF is a private digital membership network.',
      },
    });
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/auth/digital-id — Get current user's digital ID data
router.get('/digital-id', authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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
        disclaimer: 'This membership does not represent government accreditation. IDMF is a private digital membership network.',
      },
    });
  } catch (err) {
    console.error('Digital ID error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
