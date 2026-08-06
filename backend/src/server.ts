// ===========================================
// MoveMind AI — Server Entry Point
// ===========================================

import app from "./app";
import { config } from "./config";
import prisma from "./lib/prisma";

async function bootstrap() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    // Start server
    const server = app.listen(config.port, () => {
      console.log(`\n🚀 MoveMind AI Backend`);
      console.log(`   Environment : ${config.nodeEnv}`);
      console.log(`   Port        : ${config.port}`);
      console.log(`   API         : http://localhost:${config.port}/api`);
      console.log(`   Health      : http://localhost:${config.port}/api/health`);
      console.log("");
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      console.log(`\n⚡ Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await prisma.$disconnect();
        console.log("👋 Server closed. Database disconnected.");
        process.exit(0);
      });

      // Force exit after 10 seconds
      setTimeout(() => {
        console.error("⚠️  Forced shutdown after timeout.");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

bootstrap();
