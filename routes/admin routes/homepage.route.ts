import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.middleware";
import { homepageController } from "../../controllers/admin controller/homepage.controller";

const router = Router();

router.get("/", requireAuth, requireRole(["admin"]), homepageController);

export default router;