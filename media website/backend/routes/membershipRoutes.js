const express = require('express');
const router = express.Router();
const {
  subscribeMembership,
  getMyMembership,
  getAllMemberships,
} = require('../controllers/membershipController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');

/**
 * @openapi
 * tags:
 *   name: Memberships
 *   description: User memberships
 */

/**
 * @openapi
 * /api/memberships/subscribe:
 *   post:
 *     tags: [Memberships]
 *     summary: Subscribe logged-in user to a plan
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
 *         description: Membership created
 */
router.post('/subscribe', protect, subscribeMembership);

/**
 * @openapi
 * /api/memberships/me:
 *   get:
 *     tags: [Memberships]
 *     summary: Get current user's membership
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current membership
 */
router.get('/me', protect, getMyMembership);

/**
 * @openapi
 * /api/memberships:
 *   get:
 *     tags: [Memberships]
 *     summary: Get all memberships (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Membership list
 */
router.get('/', protect, authorizeRoles('admin', 'super_admin'), getAllMemberships);

module.exports = router;
