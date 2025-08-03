import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { mentorController } from "../controllers/registerMentor.controller";
import { body } from "express-validator";
import { handleValidation } from "../middleware/handleValidation.middleware";
import { validateIsActive } from "../middleware/validateIsActive.middleware";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

const router = Router();

router.post("/", 
    requireAuth, 
    requireRole(["newuser"]),
    validateIsActive,
    [
    body("role").isString().notEmpty().withMessage("Role is required"),
    body("mentorData").isObject().withMessage("Mentor data is required"),
    body("mentorData.phone_no").isString().notEmpty().withMessage("Phone number is required"),
    body("mentorData.year_graduated").isInt().withMessage("Year graduated must be a valid year"),
    body("mentorData.highest_degree_at_nitc_code").isString().notEmpty().withMessage("Highest degree at NITC is required"),
    body("mentorData.department_code").isString().notEmpty().withMessage("Department is required"),
    body("mentorData.mentoring_type").isString().isIn(["one-on-one", "community-mentoring"]).withMessage("Mentoring type is required"),
    body("mentorData.mentee_capacity").isInt().withMessage("Mentee capacity must be between 1 and 5"),
    body('mentorData.broad_area_of_expertise')
            .isArray({ min: 1 })
            .withMessage('broad_area_of_expertise must be a non-empty array'),

        body('mentorData.broad_area_of_expertise.*')
            .isString()
            .notEmpty()
            .trim()
            .withMessage('Each element in broad_area_of_expertise must be a non-empty string'),

        body('mentorData.narrow_area_of_expertise')
            .isArray({ min: 1 })
            .withMessage('narrow_area_of_expertise must be a non-empty array'),

        body('mentorData.narrow_area_of_expertise.*')
            .isString()
            .notEmpty()
            .trim()
            .withMessage('Each element in narrow_area_of_expertise must be a non-empty string'),
    ],
    handleValidation,
    mentorController
);

export default router;