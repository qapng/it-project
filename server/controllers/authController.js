const argon2 = require('argon2');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');
const User = require('../models/User');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const createAndSendToken = (id, res) => {
  const token = signToken(id);

  // Send token via cookie.
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_TOKEN_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // To prevent cross-site scripting (XSS) attacks
    httpOnly: true
  };

  // Use 'https' in production.
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Send response.
  res.status(200).json({
    success: true,
    status: 'success',
    token
  });
};

// Test function TODO: delete later
exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password
  });

  const token = signToken(newUser.id);
  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist.
  if (!email || !password) {
    return next(new AppError('Please provide your email and password', 400));
  }

  // 2) Check if email and password are correct.
  const user = await User.findOne({ email }).select('+password');

  // Ambiguous error to prevent giving info to hackers.
  if (!user || !(await argon2.verify(user.password, password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  // 3) Sign and send token.
  createAndSendToken(user.id, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2) Check if token exists.
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  // 3) Verify token.
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 4) Check if user changed password after JWT was issued.
  const user = await User.findById(decoded.id);

  // Grant access to protected routes.
  req.user = user;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Check if email exists
  if (!req.body.email) {
    return next(new AppError('Please provide an email', 400));
  }

  // 2) Check if POSTed email is valid
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError('This email is not registered with the system', 404)
    );
  }

  // 3) Generate a random reset token.
  const resetToken = user.createPasswordResetToken();
  user.save({ validateBeforeSave: false });

  // 4) Send it to user's email.
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/user/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

  try {
    sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email! Please try again later',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token.
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and user exists, set to new password.
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update passwordChangedAt property.

  // 4) Log user in. TODO: OR MAYBE NOT WHICH IS MORE SECURE.
  createAndSendToken(user.id, res);
});

exports.isUserLoggedIn = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user)
    return res.status(400).json({ success: false, message: 'User not found' });
  res.json({ success: true, user });
});
