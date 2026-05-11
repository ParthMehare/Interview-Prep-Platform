const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklist.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *@name registerUserController
 *@description Controller to register a new user
 *@route POST /api/auth/register
 *@access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // Check if user already exists
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  // If user already exists, return error
  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username: username,
    email: email,
    password: hash,
  });

  const token = await jwt.sign(
    {
      id: newUser._id,
      username: newUser.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
}

/**
 * @name loginuserController
 * @description Controller to login a user
 * @route POST /api/auth/login
 * @access Public
 */

async function loginUserController(req, res) {
  const { email, password } = req.body;

  // Check if user exists
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Compare the password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // If password is valid, generate a JWT token
  const token = await jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  // Set the token in a cookie
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
/**
 * @name logoutUserController
 * @description Controller to logout a user by blacklisting the token
 * @route GET /api/auth/logout
 * @access Public
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await blacklistTokenModel.create({ token });

    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  }
}

/**
 * @name getCurrentUserController
 * @description Controller to get the current logged in user
 * @route GET /api/auth/me
 * @access Private
 */
async function getCurrentUserController(req, res) {
  const user = await userModel.findById(req.user.id).select("-password");
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  return res.status(200).json({ 
    message: "Current user retrieved successfully",
    user: user
   });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController
};
