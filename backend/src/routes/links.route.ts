import { Router } from "express";
import {
  deleteController,
  getRedirectURLController,
  postController,
} from "../controllers/links.controller";
import { linksValidation } from "../middleware/linksValidation.middleware";

const router = Router();
router.post("/", linksValidation, postController);
router.get("/:code", linksValidation, getRedirectURLController);
// router.get("/");
router.delete("/:code", linksValidation, deleteController);
export default router;
