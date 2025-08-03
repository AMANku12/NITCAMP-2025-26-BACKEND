import Router from "express";
import { getDomainsController } from "../controllers/getDomains.controller";


const router  = Router();

router.get("/:domain_name", getDomainsController);

export default router;