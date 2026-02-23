const jwt = require('jsonwebtoken');
const JsonDB = require('../utils/db');
const JWT_SECRET = process.env.JWT_SECRET || 'aima-media-jwt-secret-key-2026-secure';
const usersDB = new JsonDB('users.json');

// Admin auth - requires role === 'admin'
const adminRequired = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = usersDB.findById(decoded.id);
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
