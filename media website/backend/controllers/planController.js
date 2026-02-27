const mongoose = require('mongoose');
const Plan = require('../models/Plan');
const Membership = require('../models/Membership');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

const toLegacyPlan = (plan) => ({
  id: plan._id,
  name: plan.name,
  price: plan.price,
  duration: `${plan.durationInDays} days`,
  durationInDays: plan.durationInDays,
  features: plan.features || [],
  is_popular: false,
  isActive: plan.isActive,
});

const buildInvoiceNumber = () => `INV-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;

exports.createPlan = async (req, res, next) => {
  try {
    const { name, price, durationInDays, features = [], isActive } = req.body;
    if (!name || price === undefined || !durationInDays) {
      return res.status(400).json({ success: false, message: 'name, price and durationInDays are required' });
    }

    const plan = await Plan.create({
      name,
      price,
      durationInDays,
      features: Array.isArray(features) ? features : [],
      isActive: isActive === undefined ? true : !!isActive,
    });

    return res.status(201).json({ success: true, data: plan });
  } catch (err) {
    return next(err);
  }
};

exports.getPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: plans.length, data: plans });
  } catch (err) {
    return next(err);
  }
};

exports.updatePlan = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid plan id' });
    }

    const updates = { ...req.body };
    if (updates.features !== undefined && !Array.isArray(updates.features)) {
      return res.status(400).json({ success: false, message: 'features must be an array of strings' });
    }

    const plan = await Plan.findByIdAndUpdate(req.params.id, updates, {
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid plan id' });
    }

    const plan = await Plan.findById(req.params.id);
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
    const plans = await Plan.find({ isActive: true }).sort({ createdAt: -1 });
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid plan id' });
    }
    const plan = await Plan.findOne({ _id: req.params.id, isActive: true });
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
    if (!mongoose.Types.ObjectId.isValid(plan_id)) {
      return res.status(400).json({ success: false, message: 'Invalid plan id' });
    }

    await Membership.updateMany(
      { user: req.user.id, status: 'active', endDate: { $lt: new Date() } },
      { $set: { status: 'expired' } }
    );

    const activeMembership = await Membership.findOne({
      user: req.user.id,
      status: 'active',
      endDate: { $gte: new Date() },
    });
    if (activeMembership) {
      return res.status(400).json({ success: false, message: 'You already have an active membership' });
    }

    const plan = await Plan.findOne({ _id: plan_id, isActive: true });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found or inactive' });

    const tx = await Transaction.create({
      user: req.user.id,
      plan: plan._id,
      amount: plan.price,
      status: 'pending',
      invoiceNumber: buildInvoiceNumber(),
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
    if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
      return res.status(400).json({ success: false, message: 'Invalid transaction id' });
    }

    const tx = await Transaction.findOne({ _id: transaction_id, user: req.user.id }).populate('plan');
    if (!tx) return res.status(404).json({ success: false, message: 'Transaction not found' });
    if (!tx.plan) return res.status(404).json({ success: false, message: 'Plan not found for transaction' });

    tx.status = 'success';
    tx.paymentId = payment_gateway_id || `sim_${Date.now()}`;
    tx.date = new Date();
    if (!tx.invoiceNumber) tx.invoiceNumber = buildInvoiceNumber();
    await tx.save();

    await Membership.updateMany(
      { user: req.user.id, status: 'active' },
      { $set: { status: 'expired' } }
    );

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Number(tx.plan.durationInDays || 30));

    await Membership.create({
      user: req.user.id,
      plan: tx.plan._id,
      startDate,
      endDate,
      status: 'active',
    });

    const user = await User.findById(req.user.id);
    if (user) {
      user.selectedPlan = String(tx.plan._id);
      user.selectedPlanName = tx.plan.name;
      user.selectedPlanPrice = tx.plan.price;
      user.selectedPlanDuration = `${tx.plan.durationInDays} days`;
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
      .sort({ createdAt: -1 })
      .populate('plan', 'name');
    const data = rows.map((r) => ({
      id: r._id,
      plan_name: r.plan?.name || '-',
      amount: r.amount,
      status: r.status === 'success' ? 'paid' : r.status,
      payment_id: r.paymentId || '',
      invoice_number: r.invoiceNumber || '',
      date: r.date || r.createdAt,
    }));
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return next(err);
  }
};

exports.getMyInvoices = async (req, res, next) => {
  try {
    const rows = await Transaction.find({ user: req.user.id, status: 'success' })
      .sort({ createdAt: -1 })
      .populate('plan', 'name');
    const data = rows.map((r) => ({
      id: r._id,
      invoice_number: r.invoiceNumber || '',
      plan_name: r.plan?.name || '-',
      amount: r.amount,
      date: r.date || r.createdAt,
      status: 'paid',
    }));
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return next(err);
  }
};
