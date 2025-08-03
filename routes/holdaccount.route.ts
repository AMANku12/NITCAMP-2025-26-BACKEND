import {Router, Request, Response, NextFunction} from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { holdAccountController } from "../controllers/holdaccount.controller";
import { validateIsActive } from "../middleware/validateIsActive.middleware";


const router = Router();

router.put("/", requireAuth, validateIsActive, holdAccountController);

export default router;
