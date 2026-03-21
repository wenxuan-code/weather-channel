import { Router } from "express";
import {
  displayWeather,
  fetchData,
  searchLocation,
} from "../controllers/indexController.js";

export const indexRouter = Router();

/*
[POST /]
receive location input from user

[GET /]
1. use input to fetch coordinates and weather data, save to req.session

2. display weather information, based on session.store

[GET /clicked/:index]
using req.session information, populate report array and res.send html based on req.params.index++

*/
indexRouter.get("/", fetchData, displayWeather);

indexRouter.post("/", searchLocation);
