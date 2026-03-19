const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, default: '', trim: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['new', 'read'],
    default: 'new',
  },
  readAt: {
    type: Date,
  }
}, { timestamps: true });

ContactSchema.index({ email: 1 });
ContactSchema.index({ status: 1 });

module.exports = mongoose.model('Contact', ContactSchema);
