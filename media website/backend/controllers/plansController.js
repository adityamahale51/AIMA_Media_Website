const User = require('../models/User');
const Transaction = require('../models/Transaction');

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 499,
    duration: 'year',
    is_popular: false,
    features: ['Digital ID card', 'Member dashboard access', 'Community updates'],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 999,
    duration: 'year',
    is_popular: true,
    features: ['Everything in Starter', 'Priority profile verification', 'Featured listing'],
  },
  {
    id: 'press-plus',
    name: 'Press Plus',
    price: 1999,
    duration: 'year',
    is_popular: false,
    features: ['Everything in Professional', 'Press event invites', 'Premium support'],
  },
  {
    id: 'institutional',
    name: 'Institutional',
    price: 4999,
    duration: 'year',
    is_popular: false,
    features: ['Team onboarding', 'Dedicated relationship manager', 'Institutional badge'],
  },
];

const buildInvoiceNumber = () => `INV-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;

exports.getPlans = async (req, res) => {
  res.json({ success: true, data: PLANS });
};

exports.getPlanById = async (req, res) => {
  const plan = PLANS.find((p) => p.id === req.params.id);
  if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
  res.json({ success: true, data: plan });
};

exports.subscribe = async (req, res, next) => {
  try {
    const { plan_id } = req.body;
    const plan = PLANS.find((p) => p.id === plan_id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    const tx = await Transaction.create({
      user: req.user.id,
      plan_id: plan.id,
      plan_name: plan.name,
      amount: plan.price,
      duration: plan.duration,
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
    tx.date = new Date();
    await tx.save();

    const user = await User.findById(req.user.id);
    if (user) {
      user.selectedPlan = tx.plan_id;
      user.selectedPlanName = tx.plan_name;
      user.selectedPlanPrice = tx.amount;
      user.selectedPlanDuration = tx.duration;
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
