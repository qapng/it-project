const express = require('express');
const authController = require('../controllers/authController');
// const userController = require('../controllers/userController');

const router = express.Router();

// @route POST api/user/register
// @desc user registers
// @access Public
router.post('/register', authController.register);

// @route POST api/user/login
// @desc user logins
// @access Public
router.post('/login', authController.login);

// @route POST api/user/forgotPassword
// @desc user forgets password and requests for password reset token
// @access Public
router.post('/forgotPassword', authController.forgotPassword);

// @route PATCH api/user/resetPassword/:token
// @desc user resets password
// @access Public
router.patch('/resetPassword/:token', authController.resetPassword);

// @route PUT api/user/update-password
// @desc Update user password
// @access Private
// router.put('/update-password', protect, updatePassword);

// @route DELETE api/user/delete-user
// @desc Delete user password
// @access Private
// router.delete('/delete-user', protect, deleteUser);

// @route GET api/user/auth
// @desc check if user is logged in
// @access Private
router
  .route('/auth')
  .get(authController.protect, authController.isUserLoggedIn);

module.exports = router;
