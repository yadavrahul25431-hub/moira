// ===========================================
// MoveMind AI — Authentication Middleware
// ===========================================

import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import type { AuthenticatedRequest } from "../types";

/**
 * Middleware that verifies the JWT access token from the Authorization header.
 * Attaches `req.user` with { id, email, role } on success.
 * Returns 401 on missing/invalid/expired tokens.
 */
export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: "Authentication required. Please provide a valid token.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        error: "Authentication required. Token is missing.",
      });
      return;
    }

    const decoded = verifyAccessToken(token);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        error: "Token has expired. Please refresh your session.",
      });
      return;
    }

    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        success: false,
        error: "Invalid token. Please log in again.",
      });
      return;
    }

    res.status(401).json({
      success: false,
      error: "Authentication failed.",
    });
  }
}

/**
 * Middleware factory that restricts access to specific user roles.
 * Must be used after `authenticate`.
 *
 * @example
 * router.get("/admin", authenticate, authorize("ADMIN"), handler);
 * router.get("/manage", authenticate, authorize("ADMIN", "MANAGER"), handler);
 */
export function authorize(...allowedRoles: string[]) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: "Authentication required.",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: "Insufficient permissions. You do not have access to this resource.",
      });
      return;
    }

    next();
  };
}
