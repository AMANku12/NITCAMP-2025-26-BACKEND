// routes/verify-session.route.ts
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(401).json({ error: "Unauthorized: No active session" });
    return;
  }
  res.status(200).json({ message: "Session valid", user: req.session.user });
  return;
});

export default router;