const Comment = require("../models/comments.model");
const Post = require("../models/post.model");

// Create a new comment
async function createComment(req, res) {
  if (!req.body.text || !req.body.postId || !req.body.author) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const comment = new Comment({
      text: req.body.text,
      postId: req.body.postId,
      author: req.body.author,
    });

    const savedComment = await comment.save();

    // Update the post with the new comment
    await Post.findByIdAndUpdate(req.body.postId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment", error);
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
}

// Get all comments for a specific post
async function getCommentsByPost(req, res) {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments", error);
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
}

module.exports = {
  createComment,
  getCommentsByPost,
};
