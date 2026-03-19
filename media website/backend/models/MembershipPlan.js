const mongoose = require('mongoose');

const MembershipPlanSchema = new mongoose.Schema({
  id: { // For compatibility with existing logic that uses string IDs
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Plan price is required'],
    min: 0,
  },
  duration: {
    type: String,
    required: true,
  },
  durationInDays: {
    type: Number,
    required: [true, 'Plan duration in days is required'],
    min: 1,
  },
  features: {
    type: [String],
    default: [],
  },
  is_popular: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

MembershipPlanSchema.index({ id: 1 });

module.exports = mongoose.model('MembershipPlan', MembershipPlanSchema);
