import { Router } from "express";
import { postController } from "../controllers/links.controller";
import { linksValidation } from "../middleware/linksValidation.middleware";

const router = Router();
router.post("/", linksValidation, postController);
// router.get("/:code");
// router.get("/");
// router.delete("/:code");
export default router;
