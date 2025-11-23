import { Router } from "express";
import { getRedirectURLController } from "../controllers/redirect.controller";
import { linksValidation } from "../middleware/linksValidation.middleware";

const router = Router();
//Redirect URL
router.get("/:code", linksValidation, getRedirectURLController);
export default router;
