// ===========================================
// MoveMind AI — Route Routes
// ===========================================

import { Router } from "express";
import { optimizeRoute } from "../controllers/route.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Protected routes
router.post("/optimize", authenticate, optimizeRoute);

export default router;
