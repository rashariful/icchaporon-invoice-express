import { Router } from "express";
import { ParcelController } from "./parcel.controller.js";

const router = Router();

router.post("/", ParcelController.addParcel);

export const ParcelRoutes = router;
