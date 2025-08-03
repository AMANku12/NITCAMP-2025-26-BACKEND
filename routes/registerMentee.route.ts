import { Router } from "express";
import {requireAuth, requireRole} from "../middleware/auth.middleware";
import { Request, Response, NextFunction } from "express";
import { menteeController } from "../controllers/registerMentee.controller";
import { body } from "express-validator";
import { handleValidation } from "../middleware/handleValidation.middleware";
import { validateIsActive } from "../middleware/validateIsActive.middleware";

const router = Router();

const validdateEmailId = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        if (!req.session.user.email.includes("@nitc.ac.in")) {
            res.status(403).json({ error: "Unauthorized Email" });
            return;
        }
        next();
        return; // Add return here to prevent further execution
    }
    res.status(401).json({ error: "Could not fetch email from the token" }); 
    return;
}

router.post("/", 
    requireAuth,
    requireRole(["newuser"]),
    validdateEmailId,
    validateIsActive,
    [
        body("role").isString().notEmpty().withMessage("Role is required"),
        body("menteeData").isObject().withMessage("Mentee data is required"),
        body("menteeData.personal_email").isEmail().withMessage("Valid email is required"),
        body("menteeData.phone_no").isString().notEmpty().withMessage("Phone number is required"),
        body('menteeData.broad_area_of_interest')
            .isArray({ min: 1 })
            .withMessage('broad_area_of_interest must be a non-empty array'),

        body('menteeData.broad_area_of_interest.*')
            .isString()
            .notEmpty()
            .trim()
            .withMessage('Each element in broad_area_of_interest must be a non-empty string'),

        body('menteeData.narrow_area_of_interest')
            .isArray({ min: 1 })
            .withMessage('narrow_area_of_interest must be a non-empty array'),

        body('menteeData.narrow_area_of_interest.*')
            .isString()
            .notEmpty()
            .trim()
            .withMessage('Each element in narrow_area_of_interest must be a non-empty string'),
    ],
    handleValidation,
    menteeController
); 

export default router;