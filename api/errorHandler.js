function errorHandler(err, req, res) {
  res.status(err.status || 500).json({
    sageAdvice: "Finding the real error is 90% of the bug fix",
    error: err.message,
    stack: err.stack,
  });
}

module.exports = errorHandler;