import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import Product from "../models/product.seller.model.js";

const uploadMiddleware = multer({ dest: "backend" });
const router = express.Router();
router.use(cors());

router.post("/add", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const { title, description, price, category, cover, seller } = req.body;
    const postProd = await Product.create({
        title, description, 
    })
  } catch (err) {}
});
