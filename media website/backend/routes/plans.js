const express = require('express');
const JsonDB = require('../utils/db');
const { authRequired } = require('../middleware/auth');

const router = express.Router();
const plansDB = new JsonDB('plans.json');
const transactionsDB = new JsonDB('transactions.json');
const usersDB = new JsonDB('users.json');

// GET /api/plans — Get all membership plans (public)
router.get('/', (req, res) => {
  try {
    const plans = plansDB.findAll();
    res.json({ success: true, data: plans });
  } catch (err) {
    console.error('Get plans error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/plans/subscribe — Subscribe to a plan (create transaction)
router.post('/subscribe', authRequired, (req, res) => {
  try {
    const { plan_id } = req.body;
    const user = usersDB.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const plan = plansDB.findById(plan_id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    // Generate invoice number
    const invoiceNumber = 'IDMA-INV-' + Date.now().toString().slice(-8);

    // Create transaction (payment pending - will be updated after Razorpay callback)
    const transaction = transactionsDB.create({
      user_id: user.id,
      plan_id: plan.id,
      plan_name: plan.name,
      amount: plan.price,
      payment_status: 'pending',
      payment_gateway_id: null,
      invoice_number: invoiceNumber,
      user_name: `${user.firstName} ${user.lastName}`,
      user_email: user.email,
    });

    // Update user with selected plan
    usersDB.update(user.id, {
      selectedPlan: plan.id,
      selectedPlanName: plan.name,
      membershipStatus: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Subscription initiated. Complete payment to activate.',
      data: {
        transaction,
        plan,
        razorpay_key: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: plan.price * 100, // Razorpay expects paise
        currency: 'INR',
        name: 'IDMA Membership',
        description: `${plan.name} - ${plan.duration}`,
        prefill: { name: `${user.firstName} ${user.lastName}`, email: user.email, contact: user.mobile },
      },
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/plans/payment-success — Confirm payment (Razorpay callback)
router.post('/payment-success', authRequired, (req, res) => {
  try {
    const { transaction_id, payment_gateway_id } = req.body;
    const user = usersDB.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Update transaction
    const transaction = transactionsDB.findById(transaction_id);
    if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });

    transactionsDB.update(transaction_id, {
      payment_status: 'paid',
      payment_gateway_id: payment_gateway_id || 'manual-' + Date.now(),
      paidAt: new Date().toISOString(),
    });

    // Update user membership status to pending (awaiting admin approval)
    const now = new Date();
    usersDB.update(user.id, {
      membershipStatus: 'pending',
      paymentCompleted: true,
      lastPaymentDate: now.toISOString(),
    });

    res.json({
      success: true,
      message: 'Payment recorded successfully. Your membership is now pending admin approval.',
    });
  } catch (err) {
    console.error('Payment success error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/plans/my/transactions — Get user's transactions
router.get('/my/transactions', authRequired, (req, res) => {
  try {
    const transactions = transactionsDB.find({ user_id: req.user.id });
    transactions.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ success: true, data: transactions });
  } catch (err) {
    console.error('Get transactions error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/plans/my/invoices — Get user's invoices
router.get('/my/invoices', authRequired, (req, res) => {
  try {
    const transactions = transactionsDB.find({ user_id: req.user.id });
    const invoices = transactions
      .filter(t => t.payment_status === 'paid')
      .map(t => ({
        id: t.id,
        invoice_number: t.invoice_number,
        plan_name: t.plan_name,
        amount: t.amount,
        date: t.paidAt || t.createdAt,
        status: t.payment_status,
      }));
    invoices.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    res.json({ success: true, data: invoices });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/plans/:id — Get single plan (MUST be after /my/* routes)
router.get('/:id', (req, res) => {
  try {
    const plan = plansDB.findById(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.json({ success: true, data: plan });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
