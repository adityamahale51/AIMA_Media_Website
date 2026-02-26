const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan_id: { type: String, required: true },
  plan_name: { type: String, required: true },
  amount: { type: Number, required: true },
  duration: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  payment_gateway_id: { type: String, default: '' },
  invoice_number: { type: String, required: true, unique: true },
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
