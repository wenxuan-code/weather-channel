import dotenv from "dotenv";
dotenv.config();
import NodeGeocoder from "node-geocoder";
import { body, matchedData, validationResult } from "express-validator";

import dummygeo from "../dev-reference/dummygeo.json" with { type: "json" };
import dummyweather from "../dev-reference/dummySmaller.json" with { type: "json" };
import { http } from "../lib/http.js";
import { formatDate } from "../lib/formatDate.js";

const apiKey = process.env.API_KEY;
const geoApiKey = process.env.GEO_API_KEY;
const geoOptions = {
  provider: "tomtom",
  apiKey: geoApiKey,
};
const geocoding = NodeGeocoder(geoOptions);

const validateSearch = [
  body("location").trim().isString().withMessage("Location should be a string"),
];

//for the form input
export const searchLocation = [
  validateSearch,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        success: false,
        errors: errors.array(),
        input: req.body.location,
      });
    }
    const { location } = matchedData(req);

    res.redirect(`/?location=${location}`);
  },
];

export async function fetchData(req, res, next) {
  //on init or empty query, default to "auckland"
  const location = req.query.location || "Auckland";
  if (location === "") {
    location = "Auckland";
  }
  //========== !Coords =============
  // Convert address to coordinates
  // const coordinates = await geocoding.geocode(location);

  //!DUMMY data
  const coordinates = dummygeo;

  if (coordinates.length < 1) {
    res.status(500).render("index", {
      success: false,
      errors: [
        { msg: "Can't find specified location. You might have made a typo!" },
      ],
    });
    return;
  }
  const finalCoord = coordinates[0];

  //========== !Weather ============
  // const weatherQueryString = `https://api.pirateweather.net/forecast/${apiKey}/${finalCoord.latitude},${finalCoord.longitude}?exclude=minutely&units=ca`;

  // const weatherDataFetch = await http.get(weatherQueryString);

  // const weatherData = weatherDataFetch.data;

  // console.log(weatherData)

  //!DUMMY data
  const weatherData = dummyweather;

  //========= Set Session ===========

  req.session.coordinate = coordinates[0];
  req.session.weatherData = weatherData;
  req.session.input = location;
  next();
}

//index page
export async function displayWeather(req, res) {
  const coordinate = req.session.coordinate;
  const weatherData = req.session.weatherData;
  const location = req.session.location;

  //=== !coords ====

  //=== !weather ====
  const currently = {
    condition: weatherData.currently.summary,
    icon: weatherData.currently.icon || "",
    temperature: weatherData.currently.apparentTemperature,
  };

  const hourly = {
    condition: weatherData.hourly.summary,
    icon: weatherData.hourly.icon,
  };

  const daily = {
    condition: weatherData.daily.summary,
    icon: weatherData.daily.icon,
  };

  //contructing the datetime string
  const currentTimezone = weatherData.timezone;
  const datetime = formatDate(weatherData.currently.time, currentTimezone);

  req.session.currently = currently;
  req.session.hourly = hourly;
  req.session.daily = daily;
  req.session.datetime = datetime;
  req.session.location = coordinate.state
    ? ` ${coordinate.state}, ${coordinate.country}`
    : `${coordinate.country}`;

  // console.log(req.session.currently);

  res.render("index", {
    success: true,

    location: req.session.location,

    longitude: coordinate.longitude,

    latitude: coordinate.latitude,

    input: location,

    datetime: datetime,

    currently: currently,

    hourly: hourly,

    daily: daily,
  });
}
