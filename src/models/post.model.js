const mongoose = require("mongoose");

const userPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  location: { type: String },
});

const postSchema = mongoose.model("post", userPostSchema);

module.exports = postSchema;
