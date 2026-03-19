const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const Plan = require('../models/Plan');

exports.createTransaction = async (req, res, next) => {
  try {
    const { planId } = req.body;
    if (!planId) return res.status(400).json({ success: false, message: 'planId is required' });
    if (!mongoose.Types.ObjectId.isValid(planId)) {
      return res.status(400).json({ success: false, message: 'Invalid plan id' });
    }

    const plan = await Plan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(404).json({ success: false, message: 'Plan not found or inactive' });
    }

    const paymentId = `PAY_${Date.now()}_${Math.floor(Math.random() * 9000 + 1000)}`;
    const transaction = await Transaction.create({
      user: req.user.id,
      plan: plan._id,
      amount: plan.price,
      paymentId,
      status: 'success', // simulated payment success
    });

    const populated = await Transaction.findById(transaction._id)
      .populate('plan', 'name price durationInDays')
      .populate('user', 'firstName lastName email');

    return res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: populated,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getMyTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('plan', 'name price durationInDays');

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({})
      .sort({ createdAt: -1 })
      .populate('plan', 'name price durationInDays')
      .populate('user', 'firstName lastName email role');

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return next(err);
  }
};
