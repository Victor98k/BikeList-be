const Express = require("express");
const {
  createComment,
  getCommentsByPost,
} = require("../controllers/comments.controller");

const commentRouter = Express.Router();

commentRouter.post("/", createComment);

commentRouter.get("/:postId", getCommentsByPost);

module.exports = commentRouter;
