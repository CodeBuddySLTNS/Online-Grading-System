const tryCatch = (handler) => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (error) {
    next(error);
  }
};

class CustomError extends Error {
  constructor(message, statusCode, body) {
    super(message);
    this.statusCode = statusCode;
    this.body = body || null;
  }
}

module.exports = {
  tryCatch,
  CustomError,
};
