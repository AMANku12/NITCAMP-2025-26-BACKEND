import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.middleware";
import { menteeDBController } from "../../controllers/admin controller/menteeDB.controller";

const router = Router();

router.get("/", requireAuth, requireRole(["admin"]), menteeDBController);

export default router;