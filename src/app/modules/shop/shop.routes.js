import express from "express";

import { ShopControllers } from "./shop.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";
import textToJsonPerser from "../../middlewares/textToJsonParser.js";

const router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    console.log("req.body", req.body);
    next();
  },
  upload.single("file"),
  textToJsonPerser,
  ShopControllers.createShop
);
router.get("/", ShopControllers.getAllShop);
router.get("/:id", ShopControllers.getSingleShop);
router.patch(
  "/:id",
  upload.single("file"),
  textToJsonPerser,
  ShopControllers.updateShop
);
router.delete("/:id", ShopControllers.deleteShop);

export const ShopRoutes = router;
