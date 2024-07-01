import { Router } from "express";
import { XlToJsonRoutes } from "../modules/xlToJson/xlToJson.routes.js";
import { InvoiceRoutes } from "../modules/invoice/invoice.routes.js";

const router = Router();

const moduleRoutes = [
  {
    path: "/xltjson",
    route: XlToJsonRoutes,
  },
  {
    path: "/invoice",
    route: InvoiceRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
