// ===========================================
// MoveMind AI — Assistant Routes
// ===========================================

import { Router } from "express";
import { chat } from "../controllers/assistant.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Protected chat endpoint
router.post("/chat", authenticate, chat);

export default router;
