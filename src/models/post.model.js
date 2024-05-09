const mongoose = require("mongoose");

const userPostSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    location: { type: String },
    author: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const postSchema = mongoose.model("post", userPostSchema);

module.exports = postSchema;
