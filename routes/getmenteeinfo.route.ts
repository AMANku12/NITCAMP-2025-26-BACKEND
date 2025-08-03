import { Router } from "express";
import {requireAuth} from "../middleware/auth.middleware";
import { getMenteeExtraInfoController } from "../controllers/getmenteeinfo.controller";

const router = Router();

router.get("/", requireAuth, getMenteeExtraInfoController);

export default router;
