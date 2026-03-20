import { Router } from "express";
import { displayWeather, searchLocation } from "../controllers/indexController.js";

export const indexRouter = Router();

indexRouter.get("/", displayWeather);
indexRouter.post("/", searchLocation)