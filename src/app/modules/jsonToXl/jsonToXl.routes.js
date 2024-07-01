import { Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary.js";
import { JsonToXlController } from "./jsonToxl.controller.js";

const router = Router();
router.post("/", upload.single("file"), JsonToXlController.jsonToXl);

export const JsonToXlRoutes = router;
