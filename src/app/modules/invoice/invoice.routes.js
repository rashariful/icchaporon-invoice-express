import express from "express";

import { InvoiceControllers } from "./invoice.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post(
  "/",

  InvoiceControllers.createInvoice
);
router.get("/", InvoiceControllers.getAllInvoice);
router.get("/:id", InvoiceControllers.getSingleInvoice);
router.post("/xl", upload.single("file"), InvoiceControllers.createInvoicesFromXLSX);
router.patch("/:id", InvoiceControllers.updateInvoice);
router.delete("/:id", InvoiceControllers.deleteInvoice);

export const InvoiceRoutes = router;
