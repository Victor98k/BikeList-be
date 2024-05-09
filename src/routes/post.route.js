const Express = require("express");
const {
  createPost,
  getAllPosts,
} = require("../controllers/userPosts.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const postRouter = Express.Router();

postRouter.post("/post", createPost);
postRouter.get("/", authMiddleware, getAllPosts);

module.exports = postRouter;
