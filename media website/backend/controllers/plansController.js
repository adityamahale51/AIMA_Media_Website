const User = require('../models/User');
const Transaction = require('../models/Transaction');
const MembershipPlan = require('../models/MembershipPlan');

const buildInvoiceNumber = () => `INV-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;

exports.getPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find({ isActive: true });
    res.json({ success: true, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await MembershipPlan.findOne({ id: req.params.id });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.json({ success: true, data: plan });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.subscribe = async (req, res, next) => {
  try {
    const { plan_id } = req.body;
    const plan = await MembershipPlan.findOne({ id: plan_id });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    const tx = await Transaction.create({
      user: req.user.id,
      plan: plan.id,
      plan_name: plan.name,
      amount: plan.price,
      status: 'pending',
      invoice_number: buildInvoiceNumber(),
    });

    res.status(201).json({
      success: true,
      data: {
        plan,
        transaction: {
          id: tx._id,
          amount: tx.amount,
          status: tx.status,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.confirmPayment = async (req, res, next) => {
  try {
    const { transaction_id, payment_gateway_id } = req.body;
    const tx = await Transaction.findOne({ _id: transaction_id, user: req.user.id });
    if (!tx) return res.status(404).json({ success: false, message: 'Transaction not found' });

    tx.status = 'paid';
    tx.payment_gateway_id = payment_gateway_id || '';
    tx.paidAt = new Date();
    await tx.save();

    const user = await User.findById(req.user.id);
    if (user) {
      user.selectedPlan = tx.plan;
      user.selectedPlanName = tx.plan_name;
      user.selectedPlanPrice = tx.amount;
      user.membershipStatus = 'pending';

      const expiry = new Date();
      expiry.setFullYear(expiry.getFullYear() + 1);
      user.membership_expiry = expiry;
      await user.save();
    }

    res.json({ success: true, data: { transaction: tx } });
  } catch (err) {
    next(err);
  }
};

exports.getMyTransactions = async (req, res, next) => {
  try {
    const rows = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
};

exports.getMyInvoices = async (req, res, next) => {
  try {
    const rows = await Transaction.find({ user: req.user.id, status: 'paid' }).sort({ createdAt: -1 });
    const invoices = rows.map((r) => ({
      id: r._id,
      invoice_number: r.invoice_number,
      plan_name: r.plan_name,
      amount: r.amount,
      date: r.date || r.createdAt,
      status: r.status,
    }));
    res.json({ success: true, data: invoices });
  } catch (err) {
    next(err);
  }
};
