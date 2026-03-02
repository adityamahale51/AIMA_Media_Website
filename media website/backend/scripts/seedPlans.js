const mongoose = require('mongoose');
const Plan = require('../models/Plan');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const plans = [
  {
    name: 'Student',
    price: 399,
    durationInDays: 365,
    features: [
      'Digital ID',
      'Member profile',
      'Limited publishing access',
      'Directory listing'
    ]
  },
  {
    name: 'Standard',
    price: 499,
    durationInDays: 365,
    features: [
      'Digital ID + printable',
      'Publish articles (with approval)',
      'Profile page',
      'Job board access',
      'Directory listing'
    ]
  },
  {
    name: 'Pro',
    price: 999,
    durationInDays: 365,
    features: [
      'Priority article approval',
      'Featured profile',
      '1 webinar included',
      'Portfolio boost',
      'Digital ID + printable'
    ]
  },
  {
    name: 'Institutional',
    price: 2999,
    durationInDays: 365,
    features: [
      'Organization page',
      'Multiple contributors',
      'Homepage feature eligibility',
      'Digital ID + printable'
    ]
  }
];

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding plans...');

    // Remove existing plans
    await Plan.deleteMany();
    console.log('Existing plans removed.');

    // Insert new plans
    await Plan.insertMany(plans);
    console.log('New plans seeded successfully.');

    process.exit();
  } catch (err) {
    console.error('Error seeding plans:', err);
    process.exit(1);
  }
};

seedPlans();
