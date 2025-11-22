import { Router } from "express";
import { getRedirectURLController } from "../controllers/redirect.controller";

const router = Router();
//Redirect URL
router.get("/", getRedirectURLController);
export default router;
