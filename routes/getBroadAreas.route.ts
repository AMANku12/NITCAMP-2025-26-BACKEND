import { Router } from "express";
import { getBroadAreasController } from "../controllers/getBroadAreas.controller";
import { Request, Response } from "express";

const router = Router();

router.get("/", getBroadAreasController);

export default router;
