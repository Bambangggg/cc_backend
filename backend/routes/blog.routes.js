import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import Blog from "../models/blog.model.js";
const uploadMiddleware = multer({ dest: "backend/uploads/" });
const router = express.Router();
router.use(cors());

router.post("/blog", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const { title, summary, content, category, author } = req.body;
    const postDoc = Blog.create({
      title,
      summary,
      content,
      category,
      cover: newPath,
      author,
    });
    console.log("Success create blog.");
    res.status(200).json(postDoc);
  } catch (err) {
    console.log("Error in blog controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/blog", async (req, res) => {
  try {
    const { author } = req.query;

    const filteredUsers = await Blog.find({ author })

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/blog/artikel", async (req, res) => {
  try {
    const listBlog = await Blog.find();
    if (!listBlog) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(listBlog);
  } catch (err) {
    console.log("Error in blog routes", err.message);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Blog.findById(id).populate("author", ["username"]);
    res.status(200).json(postDoc);
  } catch (err) {
    console.log("error in blog controller", err.message);
  }
});

export default router;
