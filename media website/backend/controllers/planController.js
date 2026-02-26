const mongoose = require('mongoose');
const Plan = require('../models/Plan');

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
