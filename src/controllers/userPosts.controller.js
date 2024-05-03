const Post = require("../models/post.model.js");

async function createPost(req, res) {
  if (!req.body || !req.body.title) {
    return res.status(400).json({ error: "Title field must be submitted" });
  }

  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Error with post request", error);
    res
      .status(500)
      .json({ message: "Error with post request", error: error.message });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate("comments");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts with comments", error);
    res.status(500).json({
      message: "Error fetching posts with comments",
      error: error.message,
    });
  }
}

module.exports = {
  createPost,
  getAllPosts,
};
