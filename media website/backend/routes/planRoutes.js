const express = require('express');
const router = express.Router();
const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
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
 *     summary: Create a membership plan (admin)
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
 *     summary: Get all plans (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Plans list
 */
router
  .route('/')
  .post(protect, authorizeRoles('admin'), createPlan)
  .get(protect, authorizeRoles('admin'), getPlans);

/**
 * @openapi
 * /api/plans/{id}:
 *   put:
 *     tags: [Plans]
 *     summary: Update a plan by id (admin)
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
 *     summary: Delete a plan by id (admin)
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
  .put(protect, authorizeRoles('admin'), updatePlan)
  .delete(protect, authorizeRoles('admin'), deletePlan);

module.exports = router;
