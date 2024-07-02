import express from "express";

import { InvoiceControllers } from "./invoice.controller.js";

const router = express.Router();

router.post(
  "/",

  InvoiceControllers.createInvoice
);
router.get("/", InvoiceControllers.getAllInvoice);
router.get("/:id", InvoiceControllers.getSingleInvoice);
router.patch("/:id", InvoiceControllers.updateInvoice);
router.delete("/:id", InvoiceControllers.deleteInvoice);

export const InvoiceRoutes = router;
