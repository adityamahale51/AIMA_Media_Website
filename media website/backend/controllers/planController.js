const MembershipPlan = require('../models/MembershipPlan');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

const toLegacyPlan = (plan) => ({
  id: plan.id,
  name: plan.name,
  price: plan.price,
  duration: plan.duration,
  durationInDays: plan.durationInDays,
  features: plan.features || [],
  is_popular: plan.is_popular,
  isActive: plan.isActive,
});

const buildInvoiceNumber = () => `INV-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;

exports.createPlan = async (req, res, next) => {
  try {
    const { id, name, price, duration, durationInDays, features = [], isActive, is_popular } = req.body;
    if (!id || !name || price === undefined || !durationInDays) {
      return res.status(400).json({ success: false, message: 'id, name, price and durationInDays are required' });
    }

    const plan = await MembershipPlan.create({
      id,
      name,
      price,
      duration: duration || 'year',
      durationInDays,
      features: Array.isArray(features) ? features : [],
      isActive: isActive === undefined ? true : !!isActive,
      is_popular: !!is_popular,
    });

    return res.status(201).json({ success: true, data: plan });
  } catch (err) {
    return next(err);
  }
};

exports.getPlans = async (req, res, next) => {
  try {
    const plans = await MembershipPlan.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: plans.length, data: plans });
  } catch (err) {
    return next(err);
  }
};

exports.updatePlan = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    const plan = await MembershipPlan.findOneAndUpdate({ id: req.params.id }, updates, {
      new: true,
      runValidators: true,
    });

    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    return res.status(200).json({ success: true, data: plan });
  } catch (err) {
    return next(err);
  }
};

exports.deletePlan = async (req, res, next) => {
  try {
    const plan = await MembershipPlan.findOne({ id: req.params.id });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    await plan.deleteOne();
    return res.status(200).json({ success: true, message: 'Plan deleted successfully' });
  } catch (err) {
    return next(err);
  }
};

// Public list (frontend compatibility)
exports.getActivePlans = async (req, res, next) => {
  try {
    const plans = await MembershipPlan.find({ isActive: true }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: plans.length,
      data: plans.map(toLegacyPlan),
    });
  } catch (err) {
    return next(err);
  }
};

exports.getActivePlanById = async (req, res, next) => {
  try {
    const plan = await MembershipPlan.findOne({ id: req.params.id, isActive: true });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    return res.status(200).json({ success: true, data: toLegacyPlan(plan) });
  } catch (err) {
    return next(err);
  }
};

// Legacy flow expected by frontend MembershipPlans page
exports.subscribePlan = async (req, res, next) => {
  try {
    const { plan_id } = req.body;
    if (!plan_id) return res.status(400).json({ success: false, message: 'plan_id is required' });

    const plan = await MembershipPlan.findOne({ id: plan_id, isActive: true });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found or inactive' });

    const tx = await Transaction.create({
      user: req.user.id,
      plan: plan.id,
      plan_name: plan.name,
      amount: plan.price,
      status: 'pending',
      invoice_number: buildInvoiceNumber(),
    });

    return res.status(201).json({
      success: true,
      data: {
        plan: toLegacyPlan(plan),
        transaction: {
          id: tx._id,
          amount: tx.amount,
          status: tx.status,
        },
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.confirmPayment = async (req, res, next) => {
  try {
    const { transaction_id, payment_gateway_id } = req.body;
    if (!transaction_id) {
      return res.status(400).json({ success: false, message: 'transaction_id is required' });
    }

    const tx = await Transaction.findOne({ _id: transaction_id, user: req.user.id });
    if (!tx) return res.status(404).json({ success: false, message: 'Transaction not found' });

    tx.status = 'paid';
    tx.payment_gateway_id = payment_gateway_id || `sim_${Date.now()}`;
    tx.paidAt = new Date();
    if (!tx.invoice_number) tx.invoice_number = buildInvoiceNumber();
    await tx.save();

    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // Default to 1 year

    const user = await User.findById(req.user.id);
    if (user) {
      user.selectedPlan = tx.plan;
      user.selectedPlanName = tx.plan_name;
      user.selectedPlanPrice = tx.amount;
      user.membership_expiry = endDate;
      user.membershipStatus = 'pending';
      await user.save();
    }

    return res.status(200).json({ success: true, data: { transaction: tx } });
  } catch (err) {
    return next(err);
  }
};

exports.getMyTransactions = async (req, res, next) => {
  try {
    const rows = await Transaction.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    const data = rows.map((r) => ({
      id: r._id,
      plan_name: r.plan_name || '-',
      amount: r.amount,
      status: r.status,
      payment_id: r.payment_gateway_id || '',
      invoice_number: r.invoice_number || '',
      date: r.paidAt || r.createdAt,
    }));
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return next(err);
  }
};

exports.getMyInvoices = async (req, res, next) => {
  try {
    const rows = await Transaction.find({ user: req.user.id, status: 'paid' })
      .sort({ createdAt: -1 });
    const data = rows.map((r) => ({
      id: r._id,
      invoice_number: r.invoice_number || '',
      plan_name: r.plan_name || '-',
      amount: r.amount,
      date: r.paidAt || r.createdAt,
      status: 'paid',
    }));
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return next(err);
  }
};
