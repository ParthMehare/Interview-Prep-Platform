const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Regiter a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUserController); 

/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access Public
 */

authRouter.post("/login", authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description Logout a user by blacklisting the token
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/me
 * @description Get the current logged in user
 * @access Private
 */
authRouter.get("/me", authMiddleware.authUser, authController.getCurrentUserController);

module.exports = authRouter;