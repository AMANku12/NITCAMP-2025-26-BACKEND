import { Router } from "express";
import { getNarrowAreasController } from "../controllers/getNarrowAreas.controller";

const router = Router();

router.get("/", getNarrowAreasController);

export default router;