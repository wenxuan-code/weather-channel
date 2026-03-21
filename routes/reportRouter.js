import { click } from "../controllers/reportController.js";
import { Router } from "express";

export const reportRouter = Router();

reportRouter.post(
  "/:index",
  click,
);
