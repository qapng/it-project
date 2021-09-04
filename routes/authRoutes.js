const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  updatePassword,
  deleteUser
} = require("../controllers/userController");

const router = express.Router();

// @route POST api/auth/register
// @desc register user
// @access Public
router.post("/register", registerUser);

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", loginUser);

// @route PUT api/auth/update-password
// @desc Update user password
// @access Private
router.put("/update-password", verifyToken, updatePassword);

// @route DELETE api/auth/delete-user
// @desc Delete user password
// @access Private
router.delete("/delete-user", verifyToken, deleteUser);

module.exports = router;
