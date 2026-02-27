const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function seedSuperAdmin() {
  const mongoUri = process.env.MONGO_URI;
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!mongoUri) {
    throw new Error('MONGO_URI is required');
  }
  if (!email || !password) {
    throw new Error('SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD are required');
  }

  await mongoose.connect(mongoUri);

  const count = await User.countDocuments({ role: 'super_admin' });
  if (count > 0) {
    console.log('Super admin already exists. No changes made.');
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = 'super_admin';
    existing.isActive = true;
    existing.isBlocked = false;
    await existing.save();
    console.log('Existing user promoted to super_admin.');
    return;
  }

  await User.create({
    firstName: process.env.SUPER_ADMIN_FIRST_NAME || 'Super',
    lastName: process.env.SUPER_ADMIN_LAST_NAME || 'Admin',
    name: `${process.env.SUPER_ADMIN_FIRST_NAME || 'Super'} ${process.env.SUPER_ADMIN_LAST_NAME || 'Admin'}`,
    email,
    mobile: process.env.SUPER_ADMIN_MOBILE || `90000${Math.floor(Math.random() * 89999 + 10000)}`,
    password,
    role: 'super_admin',
    isActive: true,
    isBlocked: false,
  });

  console.log('Super admin created successfully.');
}

seedSuperAdmin()
  .catch((err) => {
    console.error('Seed failed:', err.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
