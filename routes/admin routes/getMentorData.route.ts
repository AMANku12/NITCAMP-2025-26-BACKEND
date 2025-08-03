import { Router } from "express";
import { getMentorDataController } from "../../controllers/admin controller/getMentorData.controller";

const router = Router();

router.get("/:user_id", getMentorDataController);

export default router;