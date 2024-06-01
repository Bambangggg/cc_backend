import express from "express";
import cors from "cors";
import { getMessages, getMessagesByDate } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
router.use(cors())
router.get("/", getMessages);
router.get("chat/:date", getMessagesByDate);

export default router;
