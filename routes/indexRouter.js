import { Router } from "express";
import { displayWeather, searchLocation } from "../controllers/indexController.js";
import { click } from "../controllers/testController.js";

export const indexRouter = Router();

indexRouter.get("/", displayWeather);
indexRouter.post("/", searchLocation)

indexRouter.post("/clicked", click)