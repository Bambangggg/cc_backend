import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    category: String,
    cover: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog',blogSchema);
export default Blog;
