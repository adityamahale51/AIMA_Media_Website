exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        const err = new Error('Not authorized');
        err.statusCode = 401;
        return next(err);
      }
      if (!roles || roles.length === 0) return next();

      if (!roles.includes(req.user.role)) {
        const err = new Error(`Access denied. Required role: ${roles.join(' or ')}`);
        err.statusCode = 403;
        return next(err);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
