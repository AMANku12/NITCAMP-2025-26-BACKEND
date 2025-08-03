import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.middleware";
import { matchUsersController } from "../../controllers/admin controller/matchUsers.controller";

const router = Router();

router.get("/", requireAuth, requireRole(["admin"]), matchUsersController);

export default router;
