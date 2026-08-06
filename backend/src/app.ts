// ===========================================
// MoveMind AI — Express Application Setup
// ===========================================

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware";

// Routes
import authRoutes from "./routes/auth.routes";
import routeRoutes from "./routes/route.routes";
import assistantRoutes from "./routes/assistant.routes";

const app = express();

// ── Security ─────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Rate Limiting ────────────────────────────
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
});
app.use("/api/", limiter);

// ── Stricter limiter for auth endpoints ──────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many authentication attempts. Please try again in 15 minutes.",
  },
});

// ── Body Parsing ─────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ── Logging ──────────────────────────────────
if (config.isDev) {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ── Health Check ─────────────────────────────
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.nodeEnv,
    },
  });
});

// ── API Routes ───────────────────────────────
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/assistant", assistantRoutes);

// Future route mounts (uncomment as modules are built)
// app.use("/api/vehicles", vehicleRoutes);
// app.use("/api/routes", routeRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/api/assistant", assistantRoutes);
// app.use("/api/traffic", trafficRoutes);

// ── Error Handling ───────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
