const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(createError('Not authorized, token missing', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return next(createError('User not found for this token', 401));
    if (!user.isActive) return next(createError('Account is inactive', 403));
    if (user.isBlocked) return next(createError('Account is blocked. Contact support.', 403));

    req.user = user;
    next();
  } catch (err) {
    return next(createError('Not authorized, token invalid', 401));
  }
};
