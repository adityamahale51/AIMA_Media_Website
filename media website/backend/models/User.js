const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
  },
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, 'Please add a mobile number'],
    trim: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', ''],
    default: '',
  },
  dob: {
    type: Date,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  city: {
    type: String,
  },
  organization: {
    type: String,
  },
  designation: {
    type: String,
  },
  pincode: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    select: false,
  },
  role: {
    type: String,
    enum: ['member', 'admin', 'super_admin'],
    default: 'member',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  membershipId: {
    type: String,
    unique: true,
    sparse: true,
  },
  membershipStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending',
  },
  membershipStatusReason: {
    type: String,
    default: '',
  },
  selectedPlan: {
    type: String,
    default: '',
  },
  selectedPlanName: {
    type: String,
    default: '',
  },
  selectedPlanPrice: {
    type: Number,
    default: 0,
  },
  selectedPlanDuration: {
    type: String,
    default: '',
  },
  membership_expiry: {
    type: Date,
  },
  postsCount: {
    type: Number,
    default: 0,
  },
  membersCount: {
    type: Number,
    default: 0,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  readersCount: {
    type: Number,
    default: 0,
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
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', function (next) {
  if ((!this.firstName || !this.lastName) && this.name) {
    const chunks = this.name.trim().split(/\s+/);
    this.firstName = this.firstName || chunks[0] || '';
    this.lastName = this.lastName || (chunks.slice(1).join(' ') || '');
  }

  if (!this.name) {
    this.name = `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }

  next();
});

module.exports = mongoose.model('User', UserSchema);
