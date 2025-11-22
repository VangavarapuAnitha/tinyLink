import { Router } from "express";
import {
  deleteController,
  getLinksController,
  postController,
  statsController,
} from "../controllers/links.controller";
import { linksValidation } from "../middleware/linksValidation.middleware";

const router = Router();
//Add new URL and generate code
router.post("/", linksValidation, postController);
//Getting single URL Data for stats based on code
router.get("/:code", linksValidation, statsController);
//Getting all links information
router.get("/", getLinksController);
//Deleting url based on code
router.delete("/:code", linksValidation, deleteController);
export default router;
