const MembershipPlan = require('../models/MembershipPlan');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Membership logic is now integrated into User model or handled via Transactions
// Re-implementing subscribeMembership to use User model fields
exports.subscribeMembership = async (req, res, next) => {
  try {
    const { planId } = req.body;
    if (!planId) return res.status(400).json({ success: false, message: 'planId is required' });

    const plan = await MembershipPlan.findOne({ id: planId });
    if (!plan || !plan.isActive) {
      return res.status(404).json({ success: false, message: 'Plan not found or inactive' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Number(plan.durationInDays));

    user.selectedPlan = plan.id;
    user.selectedPlanName = plan.name;
    user.selectedPlanPrice = plan.price;
    user.membership_expiry = endDate;
    user.membershipStatus = 'approved'; // Auto-approve for simulation or update based on payment
    await user.save();

    return res.status(201).json({
      success: true,
      message: 'Membership subscribed successfully',
      data: user,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getMyMembership = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    return res.status(200).json({
      success: true,
      data: {
        planId: user.selectedPlan,
        planName: user.selectedPlanName,
        expiry: user.membership_expiry,
        status: user.membershipStatus,
      }
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAllMemberships = async (req, res, next) => {
  try {
    const users = await User.find({ selectedPlan: { $ne: '' } }).select('firstName lastName email selectedPlanName membershipStatus membership_expiry');
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    return next(err);
  }
};
