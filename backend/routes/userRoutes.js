const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Apply auth middleware to all routes in this file
router.use(auth);

// User profile routes (authenticated users can access their own profile)
router.get('/profile', (req, res) => {
  // This should be in authController, but we'll redirect to userController for now
  userController.getUserById(req, res);
});

router.put('/profile', (req, res) => {
  // This should be in authController, but we'll redirect to userController for now
  req.params.id = req.user.id;
  userController.updateUserProfile(req, res);
});

// Admin only routes - apply admin middleware specifically
router.get('/', admin, userController.getAllUsers);
router.post('/', admin, userController.createUser);
router.get('/:id', admin, userController.getUserById);
router.put('/:id/role', admin, userController.updateUserRole);
router.put('/:id/profile', admin, userController.updateUserProfile);
router.delete('/:id', admin, userController.deleteUser);

module.exports = router;