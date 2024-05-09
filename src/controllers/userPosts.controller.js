const Post = require("../models/post.model.js");
const mongoose = require("mongoose");

async function createPost(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  const { title, description, imageUrl, location, author } = req.body;

  if (!description || !title || !imageUrl || !location || !author) {
    return res.status(400).json({ error: "All fields must be submitted" });
  }

  try {
    const postData = {
      title,
      description,
      imageUrl,
      location,
      author,
    };

    const post = new Post(postData);
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
