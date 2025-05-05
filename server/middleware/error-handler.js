const { status } = require("http-status");

const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || status.INTERNAL_SERVER_ERROR).json({
    status: error.statusCode || status.INTERNAL_SERVER_ERROR,
    errorCode: error.errorCode,
    body: error.body,
    message: error.statusCode ? error.message : "Internal Server Error.",
  });
  console.log(error);
};

module.exports = errorHandler;
