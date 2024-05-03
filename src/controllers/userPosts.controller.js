const Post = require("../models/post.model.js");

async function createPost(req, res) {
  if (!req.body || !req.body.content) {
    return res.status(400).json({ error: "Content field must be submitted" });
  }

  try {
    const post = new Post({
      title: req.body.title, // Update to use 'title' from the request body
      content: req.body.content,
      imageUrl: req.body.imageUrl, // Update to use 'imageUrl' from the request body
      location: req.body.location, // Update to use 'location' from the request body
      author: req.body.author,
    });
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
