const express = require('express');
const router = express.Router();
const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
  getActivePlans,
  getActivePlanById,
  subscribePlan,
  confirmPayment,
  getMyTransactions,
  getMyInvoices,
} = require('../controllers/planController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');

/**
 * @openapi
 * tags:
 *   name: Plans
 *   description: Membership plan management
 */

/**
 * @openapi
 * /api/plans:
 *   post:
 *     tags: [Plans]
 *     summary: Create a membership plan (super_admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - durationInDays
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               durationInDays:
 *                 type: integer
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Plan created
 *
 *   get:
 *     tags: [Plans]
 *     summary: Get all plans (super_admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Plans list
 */
router
  .route('/')
  .post(protect, authorizeRoles('super_admin'), createPlan)
  .get(protect, authorizeRoles('super_admin'), getPlans);

/**
 * @openapi
 * /api/plans/public:
 *   get:
 *     tags: [Plans]
 *     summary: Get active plans (public)
 *     responses:
 *       200:
 *         description: Active plans
 */
router.get('/public', getActivePlans);

/**
 * @openapi
 * /api/plans/public/{id}:
 *   get:
 *     tags: [Plans]
 *     summary: Get active plan by id (public)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plan details
 */
router.get('/public/:id', getActivePlanById);

/**
 * @openapi
 * /api/plans/subscribe:
 *   post:
 *     tags: [Plans]
 *     summary: Subscribe current user to a plan (legacy compatibility)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [plan_id]
 *             properties:
 *               plan_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subscription initiated
 */
router.post('/subscribe', protect, subscribePlan);

/**
 * @openapi
 * /api/plans/payment-success:
 *   post:
 *     tags: [Plans]
 *     summary: Confirm payment and activate membership (legacy compatibility)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [transaction_id]
 *             properties:
 *               transaction_id:
 *                 type: string
 *               payment_gateway_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment confirmed
 */
router.post('/payment-success', protect, confirmPayment);

router.get('/my/transactions', protect, getMyTransactions);
router.get('/my/invoices', protect, getMyInvoices);

/**
 * @openapi
 * /api/plans/{id}:
 *   put:
 *     tags: [Plans]
 *     summary: Update a plan by id (super_admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               durationInDays:
 *                 type: integer
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Plan updated
 *
 *   delete:
 *     tags: [Plans]
 *     summary: Delete a plan by id (super_admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plan deleted
 */
router
  .route('/:id')
  .put(protect, authorizeRoles('super_admin'), updatePlan)
  .delete(protect, authorizeRoles('super_admin'), deletePlan);

module.exports = router;
