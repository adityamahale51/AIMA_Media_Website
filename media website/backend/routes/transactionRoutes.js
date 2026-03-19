const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getMyTransactions,
  getAllTransactions,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');

/**
 * @openapi
 * tags:
 *   name: Transactions
 *   description: Membership transactions
 */

/**
 * @openapi
 * /api/transactions/create:
 *   post:
 *     tags: [Transactions]
 *     summary: Create transaction for a plan (simulated success)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *             properties:
 *               planId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post('/create', protect, createTransaction);

/**
 * @openapi
 * /api/transactions/me:
 *   get:
 *     tags: [Transactions]
 *     summary: Get logged-in user's transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction list
 */
router.get('/me', protect, getMyTransactions);

/**
 * @openapi
 * /api/transactions:
 *   get:
 *     tags: [Transactions]
 *     summary: Get all transactions (admin or super_admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All transactions
 */
router.get('/', protect, authorizeRoles('admin', 'super_admin'), getAllTransactions);

module.exports = router;
