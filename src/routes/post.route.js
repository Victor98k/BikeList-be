const Express = require("express");
const {
  createPost,
  getAllPosts,
} = require("../controllers/userPosts.controller");
const { authMiddleware } = require("../middlewares/auth.middleware"); // Adjusted for named export

const postRouter = Express.Router();

postRouter.post("/post", authMiddleware, createPost);
postRouter.get("/", authMiddleware, getAllPosts);

module.exports = postRouter;
