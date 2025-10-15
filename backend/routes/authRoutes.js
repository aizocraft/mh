const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Protected routes (require authentication)
router.use(auth);

// User profile routes (authenticated users)
router.get('/profile', authController.getProfile);
router.put('/profile', authController.updateProfile);

module.exports = router;