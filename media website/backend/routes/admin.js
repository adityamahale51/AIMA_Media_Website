const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const adminController = require('../controllers/adminController');

router.use(protect, authorizeRoles('admin'));

router.get('/stats', adminController.getStats);

router.get('/members', adminController.getMembers);
router.put('/members/:id/approve', adminController.approveMember);
router.put('/members/:id/reject', adminController.rejectMember);
router.put('/members/:id/suspend', adminController.suspendMember);

router.get('/articles', adminController.getArticles);
router.put('/articles/:id/approve', adminController.approveArticle);
router.put('/articles/:id/reject', adminController.rejectArticle);
router.put('/articles/:id/feature', adminController.toggleFeatured);
router.put('/articles/:id/trending', adminController.toggleTrending);
router.delete('/articles/:id', adminController.deleteArticle);

router.get('/contacts', adminController.getContacts);
router.put('/contacts/:id/read', adminController.markContactRead);

router.get('/export/members', adminController.exportMembers);

module.exports = router;
