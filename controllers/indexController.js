import dotenv from "dotenv";
import NodeGeocoder from "node-geocoder";
dotenv.config();

const apiKey = process.env.API_KEY;
const geoApiKey = process.env.GEO_API_KEY;
const geoOptions = {
  provider: "tomtom",
  apiKey: geoApiKey,
  // language: "english",
  // email: "pipis2@keemail.me"
};
const geocoding = NodeGeocoder(geoOptions);

export const searchLocation = (req, res) => {
  const location = req.body.location;

  res.redirect(`/?location=${location}`);
};

export async function displayWeather(req, res) {
  //on init or empty query, default to "auckland"
  const location = req.query.location || "Auckland";

  console.log(location)

  if (location === "") {
    location = "Auckland";
  }

  // Convert address to coordinates
  const coordinates = await geocoding.geocode(location);

  //if coordinates.length < 1, res.render index with a error
  if (coordinates.length < 1) {
    res.status(500).render("index", {
      success: false,
      errors: [
        { msg: "Can't find specified location. You might have made a type!" },
      ],
    });
  } else if (!coordinates) {
    res.status(500).render("index", {
      success: false,
      errors: [{ msg: "Can't connect to geocoder" }],
    });
  }

  console.log("Coordinates:", coordinates);

  const finalCoord = coordinates[0];

  console.log(finalCoord.state);

  res.render("index", {
    success: true,
    location:
      finalCoord.state
        ? ` ${finalCoord.state}, ${finalCoord.country}`
        : `${location}, ${finalCoord.country}`,
    longitude: finalCoord.longitude,
    latitude: finalCoord.latitude,
  });
}
