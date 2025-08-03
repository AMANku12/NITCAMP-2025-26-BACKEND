import { Router } from "express";
import { unmatchedMentorsController } from "../../controllers/admin controller/unmatchedMentors.controller";
import { requireAuth, requireRole } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", requireAuth, requireRole(["admin"]), unmatchedMentorsController);

export default router;