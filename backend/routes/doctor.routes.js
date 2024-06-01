import express from "express";
import cors from "cors";
import {
  getDoctor,
  getChatDoctor,
  getUser,
} from "../controllers/user.controller.js";
const router = express.Router();
router.use(cors());
router.get("/doctor", getDoctor);
router.get("/chatdoctor", getChatDoctor);
router.get("/getuser", getUser);

export default router;
