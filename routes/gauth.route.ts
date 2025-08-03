import {Router} from "express";
import gAuthController from "../controllers/gauth.controller";
import { body } from 'express-validator';
import { handleValidation } from "../middleware/handleValidation.middleware";


const router = Router();

router.post("/",
    [
        body("googletoken").isString().notEmpty().withMessage("Google token is required")
    ],
    handleValidation,
    gAuthController
);

export default router;