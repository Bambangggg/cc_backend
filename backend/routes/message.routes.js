import express from "express";
import cors from "cors";
import { sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
router.use(cors()); 
router.post("/send/:id", sendMessage);

export default router;
