// ===========================================
// MoveMind AI — Assistant Controller
// ===========================================

import { Request, Response, NextFunction } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AppError } from "../middleware/error.middleware";
import { config } from "../config";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(config.gemini.apiKey || "MOCK_KEY");

const SYSTEM_INSTRUCTION = `
You are MoveMind AI, an expert fleet management and smart mobility assistant specifically focused on the Indian transportation ecosystem.
You help logistics managers, dispatchers, and fleet operators run their vehicle fleets efficiently across India.

Your core capabilities include:
- Suggesting route optimizations and identifying fuel-saving opportunities across Indian cities (e.g., Hyderabad, Bengaluru, Chennai, Mumbai, Delhi).
- Predicting traffic delays and weather impacts on transit times (including monsoon alerts, local festivals, or heavy density areas).
- Recommending optimal vehicle assignments (Truck, Bike, Car, Cab, Bus, Electric Vehicle).
- Providing insights on lowest toll costs, fastest routes, and lowest carbon emissions.
- Locating nearest charging stations, warehouses, and fuel stations.

Tone and Style:
- Professional, concise, and analytical.
- Use formatting (bullet points, bold text) to make your answers easy to scan.
- Always contextualize your answers for Indian logistics (e.g., using kilometers, Rupees, and local context where applicable).
- Do not make up specific live driver data if you don't know it, but simulate realistic advice for Indian traffic patterns when asked.
`;

/**
 * POST /api/assistant/chat
 * Handles conversational queries using the Gemini API.
 */
export async function chat(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      throw new AppError("Message is required.", 400);
    }

    if (!config.gemini.apiKey) {
      throw new AppError(
        "Gemini API key is not configured on the server. Please add GEMINI_API_KEY to the .env file.",
        500
      );
    }

    // Initialize the specific model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Using flash for fast, conversational responses
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Format history for Gemini SDK
    // Gemini expects history in the format { role: "user" | "model", parts: [{ text: "..." }] }
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Start chat session
    const chatSession = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Send the user's message
    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    res.status(200).json({
      success: true,
      data: {
        reply: responseText,
      },
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    next(new AppError(error.message || "Failed to process chat request.", 500));
  }
}
