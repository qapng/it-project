// Takes a function and returns a function.
// Catch errors from async functions.
// Handling promise rejections.
module.exports = fn => (req, res, next) => {
  fn(req, res, next).catch(next);
};
