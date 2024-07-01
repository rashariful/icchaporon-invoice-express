import { Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary.js";
import { XlToJsonController } from "./XlToJson.controller.js";

const router = Router();
router.post("/", upload.single("file"), XlToJsonController.xlToJson);

export const XlToJsonRoutes = router;
