// Imports
const express = require('express');
const userController = require('../controllers/userController');

// Create router
const router = express.Router();

// Routes
router.route('/api/register').post(userController.register);
router.route('/api/login').post(userController.login);

module.exports = router;