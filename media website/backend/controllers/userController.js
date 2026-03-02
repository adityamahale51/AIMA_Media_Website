const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const formatDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const serializeUser = (user) => ({
  id: user._id,
  firstName: user.firstName || '',
  lastName: user.lastName || '',
  name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name || '',
  email: user.email,
  mobile: user.mobile,
  state: user.state || '',
  city: user.city || user.district || '',
  district: user.district || user.city || '',
  organization: user.organization || '',
  designation: user.designation || '',
  profilePhoto: user.profilePhoto || '',
  membershipId: user.membershipId || '',
  membershipStatus: user.membershipStatus || 'pending',
  selectedPlan: user.selectedPlan || '',
  selectedPlanName: user.selectedPlanName || '',
  membership_expiry: user.membership_expiry || null,
  role: user.role,
  linkedin: user.linkedin || '',
  website: user.website || '',
  skills: user.skills || '',
  joinedDate: formatDate(user.joinedDate || user.createdAt),
  isActive: user.isActive,
  isBlocked: user.isBlocked,
});

const VALID_ROLES = ['member', 'admin', 'super_admin'];

// GET /api/users/me
exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, user: serializeUser(user) });
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

    if (updates.city && !updates.district) updates.district = updates.city;
    if ((updates.firstName || updates.lastName) && !updates.name) {
      updates.name = `${updates.firstName || ''} ${updates.lastName || ''}`.trim();
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
    res.status(200).json({ success: true, user: serializeUser(user) });
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

    await user.deleteOne();
    res.status(200).json({ success: true, message: 'User removed' });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/users/:id/role (super_admin only)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const targetId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(targetId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id' });
    }
    if (!role || !VALID_ROLES.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role value' });
    }

    const targetUser = await User.findById(targetId);
    if (!targetUser) return res.status(404).json({ success: false, message: 'User not found' });

    // extra guard: non-super admin cannot self-promote (even if route protections change)
    if (req.user.role === 'admin' && String(req.user._id) === String(targetUser._id) && role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin cannot promote themselves' });
    }

    if (targetUser.role === 'super_admin' && role !== 'super_admin') {
      const superAdminCount = await User.countDocuments({ role: 'super_admin', isActive: true });
      if (superAdminCount <= 1) {
        return res.status(400).json({ success: false, message: 'Cannot demote the last super_admin' });
      }
    }

    targetUser.role = role;
    await targetUser.save();

    return res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: {
        id: targetUser._id,
        email: targetUser.email,
        role: targetUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/users/:id/block (admin/super_admin)
exports.blockUnblockUser = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(targetId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    const targetUser = await User.findById(targetId);
    if (!targetUser) return res.status(404).json({ success: false, message: 'User not found' });
    if (targetUser.role === 'super_admin') {
      return res.status(403).json({ success: false, message: 'Cannot block/unblock super_admin user' });
    }

    if (String(targetUser._id) === String(req.user._id)) {
      return res.status(400).json({ success: false, message: 'You cannot block/unblock yourself' });
    }

    const shouldBlock = typeof req.body.isBlocked === 'boolean'
      ? req.body.isBlocked
      : !targetUser.isBlocked;

    targetUser.isBlocked = shouldBlock;
    // Keep isActive aligned for safety
    targetUser.isActive = !shouldBlock;
    await targetUser.save();

    return res.status(200).json({
      success: true,
      message: shouldBlock ? 'User blocked successfully' : 'User unblocked successfully',
      data: {
        id: targetUser._id,
        email: targetUser.email,
        isBlocked: targetUser.isBlocked,
        isActive: targetUser.isActive,
      },
    });
  } catch (err) {
    next(err);
  }
};
