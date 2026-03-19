const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: String, // Plan ID (string)
    required: true,
  },
  plan_name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  payment_gateway_id: {
    type: String,
    default: '',
  },
  invoice_number: {
    type: String,
    unique: true,
    sparse: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  paidAt: {
    type: Date,
  },
}, { timestamps: true });

TransactionSchema.index({ user: 1 });
TransactionSchema.index({ invoice_number: 1 });

module.exports = mongoose.model('Transaction', TransactionSchema);
