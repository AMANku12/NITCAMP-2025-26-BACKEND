import {Router, Request, Response, NextFunction} from "express";
import {  requireAuth, requireRole,  } from "../middleware/auth.middleware";
import { deleteAccountController } from "../controllers/deleteaccount.controller";
import { validateIsActive } from "../middleware/validateIsActive.middleware";


const router = Router();

router.delete("/", requireAuth, requireRole(["mentee","mentor"]), validateIsActive, deleteAccountController);

export default router;
