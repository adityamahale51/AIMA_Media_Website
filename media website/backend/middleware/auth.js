const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'aima-media-jwt-secret-key-2026-secure';

// Required auth - returns 401 if no token
const authRequired = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token is not valid or expired' });
  }
};

// Optional auth - attaches user if token exists, continues anyway
const authOptional = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.replace('Bearer ', '');

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch {
      // Token invalid, but continue anyway
    }
  }
  next();
};

module.exports = { authRequired, authOptional };
