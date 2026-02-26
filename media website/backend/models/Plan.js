const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
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
  durationInDays: {
    type: Number,
    required: [true, 'Plan duration is required'],
    min: 1,
  },
  features: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Plan', PlanSchema);
