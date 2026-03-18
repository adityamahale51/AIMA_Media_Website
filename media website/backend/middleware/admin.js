const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'idmf-media-jwt-secret-key-2026-secure';

// Admin auth - requires role === 'admin'
const adminRequired = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    req.user = decoded;
    req.adminUser = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token is not valid or expired' });
  }
};

module.exports = { adminRequired };
