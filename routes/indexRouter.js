import { Router } from "express";
import { displayWeather } from "../controllers/indexController.js";

export const indexRouter = Router();

indexRouter.get("/", displayWeather);
