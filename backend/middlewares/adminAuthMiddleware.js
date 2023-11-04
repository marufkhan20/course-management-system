const jwt = require("jsonwebtoken");

// check authentication
const adminAuthMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        error: "Authentication Failure!!",
      });
    }

    token = token.replace("Bearer ", "");

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    if (decode.role !== "admin") {
      return res.status(401).json({
        message: "Can't Access without Admin!!",
      });
    }

    if (decode.role === "admin") {
      next();
    }
  } catch (err) {
    res.status(401).json({
      message: "JWT Expire!!",
    });
  }
};

module.exports = adminAuthMiddleware;
