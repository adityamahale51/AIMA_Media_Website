const User = require('../models/User');

exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(401).json({ success: false, message: 'Not authorized' });
      if (!roles.includes(user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
      next();
    } catch (err) {
      next(err);
    }
  };
};
