import {Router, Request, Response, NextFunction} from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { holdAccountController } from "../controllers/holdaccount.controller";
import { validateIsActive } from "../middleware/validateIsActive.middleware";


const router = Router();

router.put("/", authMiddleware, validateIsActive, holdAccountController);

export default router;
