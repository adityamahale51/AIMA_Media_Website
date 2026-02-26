const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// GET /api/users/me
exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/me
exports.updateMyProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body };

    // if multer placed a file
    if (req.file) {
      updates.profilePhoto = `/uploads/profile/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// GET /api/users (admin) - pagination + search
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';

    const query = {};
    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { mobile: regex },
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, total, page, limit, users });
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id (admin)
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/users/:id (admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // remove profile photo file if exists
    if (user.profilePhoto) {
      const filePath = path.join(process.cwd(), 'media website', 'backend', user.profilePhoto.replace(/^\//, ''));
      fs.unlink(filePath, (err) => { /* ignore errors */ });
    }

    await user.remove();
    res.status(200).json({ success: true, message: 'User removed' });
  } catch (err) {
    next(err);
  }
};
