import {NextFunction, Router, Request, Response} from 'express';
import {requireAuth, requireRole} from '../middleware/auth.middleware';
import { updateProfileController } from "../controllers/updateprofile.controller";
import { validateUpdateFeilds } from "../middleware/validateUpdateFields.middleware";
import { validateIsActive } from "../middleware/validateIsActive.middleware";

const router = Router();

router.put("/", requireAuth, requireRole(["mentee", "mentor"]),validateUpdateFeilds,validateIsActive,updateProfileController);


export default router;