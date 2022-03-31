const argon2 = require('argon2');
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8,
    select: false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
});

// Encrypt password if it is modified.
UserSchema.pre('save', async function (next) {
  // Only if password if modified
  if (!this.isModified('password')) return next();

  this.password = await argon2.hash(this.password);
  this.passwordConfirm = undefined;
  // JWT is sometimes issued earlier than saving document so reduced 1 second.
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Check if password has been changed after JWT was issued.
UserSchema.methods.passwordChangedAfterJWT = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Generate a random password reset token.
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Encrypt reset token before saving to database.
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Reset password expires in 10 min.
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('users', UserSchema);
