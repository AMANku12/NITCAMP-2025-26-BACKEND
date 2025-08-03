import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.middleware";
import { getMatchedDataController } from "../../controllers/admin controller/matchedData.controller";

const router = Router();

router.get("/", requireAuth, requireRole(["admin"]), getMatchedDataController);

export default router;