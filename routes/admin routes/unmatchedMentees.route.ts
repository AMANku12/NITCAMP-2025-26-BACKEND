import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.middleware";
import { unmatchedMenteesController } from "../../controllers/admin controller/unmatchedMentees.controller";

const router = Router();

router.get("/", requireAuth, requireRole(["admin"]), unmatchedMenteesController);

export default router;