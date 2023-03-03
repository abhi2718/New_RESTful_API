module.exports = (error, req, res, next) => {
  const status = error.statusCode || 500,
    message = error.message,
    data = error.data,
    validation = error.validation;
  res.status(status).json({
    message,
    data,
    validation,
  });
};
