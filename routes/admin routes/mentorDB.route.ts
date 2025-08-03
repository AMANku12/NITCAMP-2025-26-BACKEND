import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.middleware";
import { mentorDBController } from "../../controllers/admin controller/mentorDB.controller";

const router = Router();

router.get("/", requireAuth, requireRole(["admin"]), mentorDBController);

export default router;
