const Express = require("express");
const {
  getUsers,
  getUser,
  getCurrentUser,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const userRouter = Express.Router();

userRouter.get("/", authMiddleware, getUsers);
userRouter.get("/:id", authMiddleware, getUser);
userRouter.get("/me", authMiddleware, getCurrentUser);

module.exports = userRouter;
