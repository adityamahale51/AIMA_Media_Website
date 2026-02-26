const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');

router.get('/', membersController.getMembers);
router.get('/active', membersController.getActiveMembers);

module.exports = router;
