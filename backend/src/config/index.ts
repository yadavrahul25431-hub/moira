// ===========================================
// MoveMind AI - Environment Configuration
// ===========================================

import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",

  // Database
  databaseUrl: process.env.DATABASE_URL!,

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || "fallback_secret_do_not_use_in_prod",
    expiresIn: "7d",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret",
    refreshExpiresIn: "30d",
  },

  // Gemini AI
  gemini: {
    apiKey: process.env.GEMINI_API_KEY!,
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
  },
} as const;

// Validate required env vars at startup
const requiredVars = ["DATABASE_URL", "JWT_SECRET", "JWT_REFRESH_SECRET"];

for (const varName of requiredVars) {
  if (!process.env[varName]) {
    throw new Error(`❌ Missing required environment variable: ${varName}`);
  }
}
