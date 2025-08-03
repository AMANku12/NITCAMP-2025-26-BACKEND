import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import { validateIsActive } from "../middleware/validateIsActive.middleware";
import { getMyMenteesController } from "../controllers/getMyMentees.controller";

const router = Router();

router.get("/", requireAuth, requireRole(["mentor"]), validateIsActive, getMyMenteesController);

export default router;
