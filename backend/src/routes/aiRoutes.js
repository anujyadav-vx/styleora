import express from "express";
import { fashionAssistant } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/fashion-chat", authMiddleware, fashionAssistant);

export default router;
