const Express = require("express");

const {
  createPost,
  getAllPosts,
} = require("../controllers/userPosts.controller");

const postRouter = Express.Router();

postRouter.post("/post", createPost);
postRouter.get("/", getAllPosts);

module.exports = postRouter;
