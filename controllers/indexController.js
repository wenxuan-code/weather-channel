import dotenv from "dotenv";
import geocoding from "@aashari/nodejs-geocoding";
dotenv.config();

const apiKey = process.env.API_KEY;

export async function displayWeather(req, res) {
  // const geocoding = require('@aashari/nodejs-geocoding');

  // Convert address to coordinates
  const coordinates = await geocoding.encode("Auckland");
  console.log("Coordinates:", coordinates);

  res.render("index", {
    location: coordinates[0].formatted_address,
    longitude: coordinates[0].longitude,
    latitude: coordinates[0].latitude
  });
}
