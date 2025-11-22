import { Router } from "express";
import { getRedirectURLController } from "../controllers/redirect.controller";
const router = Router();
router.get("/", getRedirectURLController);
export default router;
