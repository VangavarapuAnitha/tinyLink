import { Router } from "express";
import {
  deleteController,
  getLinksController,
  postController,
  statsController,
} from "../controllers/links.controller";
import { linksValidation } from "../middleware/linksValidation.middleware";

const router = Router();
router.post("/", linksValidation, postController);
router.get("/:code", linksValidation, statsController);
router.get("/", getLinksController);
router.delete("/:code", linksValidation, deleteController);
export default router;
