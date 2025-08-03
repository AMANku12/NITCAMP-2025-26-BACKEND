// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log("requireAuth middleware called");
  if (!req.session.user) {
    console.log("No active session found for user");
    res.status(401).json({ error: "Unauthorized: No active session" });
    return;
  }
  console.log("User session found:", req.session.user);
  next();
};

export const requireRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  console.log("requireRole middleware called for roles:", roles);
  if (!req.session.user) {
    console.log("No active session found for user");
    res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    return;
  }
  if (!roles.includes(req.session.user.role)) {
    console.log("User role not permitted:", req.session.user.role);
    res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    return;
  }
  console.log("User role permitted:", req.session.user.role);
  next();
};