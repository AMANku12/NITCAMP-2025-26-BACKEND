import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import { validateIsActive } from "../middleware/validateIsActive.middleware";
import { getMyMentorController } from "../controllers/getMyMentor.controller";

const router = Router();

router.get("/", requireAuth, requireRole(["mentee"]), validateIsActive, getMyMentorController);

export default router;
