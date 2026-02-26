const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const newsController = require('../controllers/newsController');
const { newsUpload } = require('../config/multer');

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management
 */

/**
 * @swagger
 * /api/news:
 *   post:
 *     tags: [News]
 *     summary: Create news (logged in users)
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               state:
 *                 type: string
 *               district:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: News created
 */
router.post('/', protect, newsUpload.any(), newsController.createNews);

/**
 * @swagger
 * /api/news:
 *   get:
 *     tags: [News]
 *     summary: Get all news (public sees only approved)
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
 *         name: state
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of news
 */
router.get('/', newsController.getAllNews);

// special endpoints before ':id' to avoid being treated as an ObjectId
router.get('/my', protect, newsController.getMyNews);
router.get('/trending', newsController.getTrending);
router.get('/featured', newsController.getFeatured);


/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     tags: [News]
 *     summary: Get news by id (public only approved unless admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News object
 */
router.get('/:id', newsController.getNewsById);

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     tags: [News]
 *     summary: Update news (author or admin)
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: News updated
 */
router.put('/:id', protect, newsUpload.any(), newsController.updateNews);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     tags: [News]
 *     summary: Delete news (author or admin)
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
 *         description: Deleted
 */
router.delete('/:id', protect, newsController.deleteNews);

/**
 * @swagger
 * /api/news/{id}/approve:
 *   patch:
 *     tags: [News]
 *     summary: Approve news (admin only)
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
 *         description: Approved
 */
router.patch('/:id/approve', protect, authorizeRoles('admin'), newsController.approveNews);
router.put('/:id/like', newsController.likeNews);

module.exports = router;
