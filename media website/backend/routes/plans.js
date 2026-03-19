const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const plansController = require('../controllers/plansController');

router.get('/', plansController.getPlans);
router.post('/subscribe', protect, plansController.subscribe);
router.post('/payment-success', protect, plansController.confirmPayment);

router.get('/my/transactions', protect, plansController.getMyTransactions);
router.get('/my/invoices', protect, plansController.getMyInvoices);
router.get('/:id', plansController.getPlanById);

module.exports = router;
