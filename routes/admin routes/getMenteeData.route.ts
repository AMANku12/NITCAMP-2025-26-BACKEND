import { Router } from "express";
import { getMenteeDataController } from "../../controllers/admin controller/getMenteeData.controller";

const router = Router();

router.get("/:user_id", getMenteeDataController);

export default router;
