const { default: status } = require("http-status");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.SYSTEM_SECRET_KEY;
    const whiteList = ["/auth/login", "/auth/signup", "/departments"];

    // Allow login and signup without token
    if (whiteList.includes(req.url)) {
      return next();
    }

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      if (token) {
        jwt.verify(token, secretKey, (err, verifiedToken) => {
          if (err) {
            return res
              .status(status.FORBIDDEN)
              .json({ message: "Invalid token" });
          }
          res.locals.userId = verifiedToken.userId;
          next();
        });
      } else {
        return res.status(status.FORBIDDEN).json({ message: "Invalid token" });
      }
    } else {
      return res.status(status.FORBIDDEN).json({ message: "Invalid token" });
    }
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = authenticate;
