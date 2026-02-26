const mongoose = require('mongoose');
const Membership = require('../models/Membership');
const Plan = require('../models/Plan');

const markExpiredMemberships = async (userId) => {
  await Membership.updateMany(
    { user: userId, status: 'active', endDate: { $lt: new Date() } },
    { $set: { status: 'expired' } }
  );
};

exports.subscribeMembership = async (req, res, next) => {
  try {
    const { planId } = req.body;
    if (!planId) return res.status(400).json({ success: false, message: 'planId is required' });
    if (!mongoose.Types.ObjectId.isValid(planId)) {
      return res.status(400).json({ success: false, message: 'Invalid plan id' });
    }

    await markExpiredMemberships(req.user.id);

    const existingActive = await Membership.findOne({
      user: req.user.id,
      status: 'active',
      endDate: { $gte: new Date() },
    });

    if (existingActive) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active membership',
      });
    }

    const plan = await Plan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(404).json({ success: false, message: 'Plan not found or inactive' });
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Number(plan.durationInDays));

    const membership = await Membership.create({
      user: req.user.id,
      plan: plan._id,
      startDate,
      endDate,
      status: 'active', // payment simulated as successful
    });

    const populated = await Membership.findById(membership._id)
      .populate('plan')
      .populate('user', 'firstName lastName email');

    return res.status(201).json({
      success: true,
      message: 'Membership subscribed successfully',
      data: populated,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getMyMembership = async (req, res, next) => {
  try {
    await markExpiredMemberships(req.user.id);

    const membership = await Membership.findOne({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('plan');

    if (!membership) {
      return res.status(404).json({ success: false, message: 'No membership found for user' });
    }

    return res.status(200).json({ success: true, data: membership });
  } catch (err) {
    return next(err);
  }
};

exports.getAllMemberships = async (req, res, next) => {
  try {
    // keep statuses fresh whenever admin reads list
    await Membership.updateMany(
      { status: 'active', endDate: { $lt: new Date() } },
      { $set: { status: 'expired' } }
    );

    const memberships = await Membership.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'firstName lastName email role')
      .populate('plan', 'name price durationInDays isActive');

    return res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships,
    });
  } catch (err) {
    return next(err);
  }
};
