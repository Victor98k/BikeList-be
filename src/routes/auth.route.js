//TODO add auth route
const Express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const authRouter = Express.Router();

authRouter.post("/register", authMiddleware, registerUser);
authRouter.post("/login", authMiddleware, loginUser);

module.exports = authRouter;
