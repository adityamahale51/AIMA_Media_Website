const mongoose = require('mongoose');

const MemberProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  linkedin: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  skills: {
    type: String,
    default: '',
  },
  achievements: [String],
  socialMedia: {
    twitter: String,
    facebook: String,
    instagram: String,
  }
}, { timestamps: true });

MemberProfileSchema.index({ user: 1 });

module.exports = mongoose.model('MemberProfile', MemberProfileSchema);
