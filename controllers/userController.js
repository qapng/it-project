const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  // Simple Validation for adequate information
  if (!username || !password || !email) {
    // No username or password specify
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    if (user) {
      // Username taken
      return res
        .status(400)
        .json({ success: false, message: 'Username is taken' });
    }

    // Create and save new account
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();

    // Return access token
    const accessToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
    );

    return res.json({
      success: true,
      message: 'User created successfully',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Simple Validation
  if (!username || !password) {
    // No username or password specify
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' });
  }
  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid username' });
    }

    // Username found check password
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid password' });
    }

    // Valid username and password, return access token
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
    );

    return res.json({
      success: true,
      message: 'User logged in successfully',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const updatePassword = async (req, res) => {
  const { userId } = req;
  const { password } = req.body;
  // Simple validation of user input
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: 'Password is missing' });
  }
  const newHashedPassword = await argon2.hash(password);
  try {
    await User.updateOne({ _id: userId }, { password: newHashedPassword });
    return res.status(200).json({ success: true, message: 'Password changed' });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndRemove({ _id: req.userId });
    if (!deletedUser) {
      return res
        .status(401)
        .json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ sucess: false, message: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
  deleteUser,
};
