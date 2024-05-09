const Post = require("../models/post.model.js");
const mongoose = require("mongoose"); // Import mongoose

async function createPost(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  const { title, description, imageUrl, location, author } = req.body;

  // Check all required fields
  if (!description || !title || !imageUrl || !location || !author) {
    return res.status(400).json({ error: "All fields must be submitted" });
  }

  console.log("Author ID:", author);
  // Validate author ObjectId once
  if (!mongoose.Types.ObjectId.isValid(author)) {
    return res.status(400).json({ error: "Invalid or missing author ID" });
  }

  try {
    const postData = {
      title,
      description,
      imageUrl,
      location,
      author: mongoose.Types.ObjectId(author), // Convert author to ObjectId
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
