import {Router, Request, Response, NextFunction} from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { unholdAccountController } from "../controllers/unhold.controller";

const router = Router();

router.put("/", requireAuth, unholdAccountController);

export default router;
