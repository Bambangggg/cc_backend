import express from "express";
import cors from "cors";
import { login, logout, signup } from "../controllers/auth.controller.js";
const router = express.Router();
router.use(cors());
router.post("/signup", signup);

router.get("/login", login);

router.post("/logout", logout);

export default router;
