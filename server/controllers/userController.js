const argon2 = require('argon2');
const User = require('../models/User');

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
      .json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  updatePassword,
  deleteUser
};
