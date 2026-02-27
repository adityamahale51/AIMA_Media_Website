const express = require('express');
const router = express.Router();
const {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
  blockUnblockUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { profileUpload } = require('../config/multer');

/**
 * @openapi
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: string
 *         gender:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         address:
 *           type: string
 *         state:
 *           type: string
 *         district:
 *           type: string
 *         pincode:
 *           type: string
 *         profilePhoto:
 *           type: string
 */

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Not authorized
 */
router.get('/me', protect, getMyProfile);


/**
 * @openapi
 * /api/users/me:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update current user's profile (multipart/form-data for profilePhoto)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated profile
 */
router.put('/me', protect, profileUpload.single('profilePhoto'), updateMyProfile);


/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users (admin only) with pagination and search
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', protect, authorizeRoles('admin', 'super_admin'), getAllUsers);


/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID (admin only)
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
 *         description: User object
 */
router.get('/:id', protect, authorizeRoles('admin', 'super_admin'), getUserById);


/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user (admin only)
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
 *         description: User deleted
 */
router.delete('/:id', protect, authorizeRoles('admin', 'super_admin'), deleteUser);

/**
 * @openapi
 * /api/users/{id}/role:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user role (super_admin only)
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
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [member, admin, super_admin]
 *     responses:
 *       200:
 *         description: User role updated
 */
router.patch('/:id/role', protect, authorizeRoles('super_admin'), updateUserRole);

/**
 * @openapi
 * /api/users/{id}/block:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Block/unblock user (admin or super_admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isBlocked:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User block status changed
 */
router.patch('/:id/block', protect, authorizeRoles('admin', 'super_admin'), blockUnblockUser);

module.exports = router;
