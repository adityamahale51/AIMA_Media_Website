const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  state: { type: String },
  city: { type: String },
  organization: { type: String },
  designation: { type: String },
  password: { type: String, required: true },
  membershipId: { type: String, unique: true },
  joinedDate: { type: String },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['member', 'admin'], default: 'member' },
  membershipStatus: { type: String, enum: ['pending', 'approved', 'rejected', 'suspended'], default: 'pending' },
  verification_status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  selectedPlan: { type: String, default: null },
  selectedPlanName: { type: String, default: null },
  membership_start: { type: Date, default: null },
  membership_expiry: { type: Date, default: null },
  linkedin: { type: String, default: '' },
  website: { type: String, default: '' },
  skills: { type: String, default: '' },
  postsCount: { type: Number, default: 0 },
  membersCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
  readersCount: { type: Number, default: 0 },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
