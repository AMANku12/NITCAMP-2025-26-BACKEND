import {Router, Request, Response, NextFunction} from "express";
import { queriesController } from "../controllers/queries.controller";
import { body } from "express-validator/lib/middlewares/validation-chain-builders";
import { handleValidation } from "../middleware/handleValidation.middleware";
import { validateIsActive } from "../middleware/validateIsActive.middleware";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, requireRole(["mentee", "mentor"]), validateIsActive,
    [
        body("content").isString().notEmpty().withMessage("Query is required"),
        body("content").isLength({ max: 500 }).withMessage("Query must be at most 500 characters long")
    ],
    handleValidation,
    queriesController
);

export default router;  
