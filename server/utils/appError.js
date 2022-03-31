class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.success = false;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // To only send operational errors to client.
    this.isOperational = true;

    // Exclude constructor from error stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
