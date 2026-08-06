// ===========================================
// MoveMind AI — Validation Middleware
// ===========================================

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

/**
 * Middleware factory that validates request body against a Zod schema.
 * On success, replaces req.body with the parsed (cleaned) output.
 * On failure, returns a 400 with structured error details.
 */
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          error: "Validation failed",
          details,
        });
        return;
      }
      next(error);
    }
  };
}
