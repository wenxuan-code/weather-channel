# The Plan

I want to create a weather channel page that displays the weather of your current location.
There will be different designs!

Ideas:

- TV
- Receipt
- Crystal Ball / Fortune Teller
- Wizard

I'll have to create the backend first and have exposed endpoints. Need to figure out how to do that...

Actually, I think I'll just render everything server side. So much easier. Wait! But then I won't get the user's location. Darn.

## My Pirate weather api key:

yz3mrZA02DPCWU85th6YaKSsJroOpFLe

I'll probably need to make a backend to process the weather data. Need to keep this api key secret.

## Query url

https://api.pirateweather.net/forecast/[apikey]/[latitude],[longitude],[time]?exclude=[excluded]&units=[unit]&extend=[hourly]&version=[2]&lang=[lang]&extraVars=[stationPressure]&include=[day_night_forecast]

## minimum:

https://api.pirateweather.net/forecast/[apikey]/[latitude],[longitude]

## weather for auckland:

https://api.pirateweather.net/forecast/yz3mrZA02DPCWU85th6YaKSsJroOpFLe/-36.789300,174.772000

## Latitude and Longitude

To get location, need to find latitude and longitude
Can use [geolocation api](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)

```
const options = {
   enableHighAccuracy: false,
   timeout: 5000,
   maximumAge: Infinity
 }

const success = (position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  console.log(lat)
  console.log(long)
}

const error = (err) => {
  console.error(err)
}

navigator.geolocation.getCurrentPosition(success, error, options);
```

update! I decided to install the @aashari/nodejs-geocoding npm package instead. 
https://github.com/aashari/nodejs-geocoding
