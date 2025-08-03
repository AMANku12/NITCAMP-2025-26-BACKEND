// routes/logout.route.ts
import { Router } from "express";
import { Request, Response } from "express";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});

export default router;