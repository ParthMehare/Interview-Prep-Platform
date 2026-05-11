const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");


/** 
 * @name authUser
 * @description Middleware to authenticate a user by verifying the token
 * @route GET /api/auth/me
 * @access Private
 */
async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  // Check if the token is blacklisted
  const isBlacklisted = await tokenBlacklistModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is invalid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  authUser,
};
