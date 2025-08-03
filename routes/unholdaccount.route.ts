import {Router, Request, Response, NextFunction} from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { unholdAccountController } from "../controllers/unhold.controller";

const router = Router();

router.put("/", authMiddleware, unholdAccountController);

export default router;
