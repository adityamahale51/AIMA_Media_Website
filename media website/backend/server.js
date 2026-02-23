const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/news', require('./routes/news'));
app.use('/api/members', require('./routes/members'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'AIMA Media API is running', timestamp: new Date().toISOString() });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.listen(PORT, () => {
  console.log(`\n  AIMA Media Backend Server`);
  console.log(`  ➜  API:     http://localhost:${PORT}/api`);
  console.log(`  ➜  Health:  http://localhost:${PORT}/api/health\n`);
});
