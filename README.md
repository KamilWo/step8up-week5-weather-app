# Weather application using OpenWeatherMap

## Description

The app uses OpenWeatherMap API to fetch Latitude and Longitude of the city.

After that it performs another request, which will then retrieve weather data.

Then the JavaScripts will update dynamically the page showing the result.

## What the app can do

- [ ] The user can enter a location (city name or postal code) into the input field, and the app will fetch the weather
  data for that location.
- [ ] The app converts the entered location into latitude and longitude using the OpenWeatherMap Geocoding API.
    - Endpoint: `https://api.openweathermap.org/geo/1.0/direct?q=<location>&appid=<API_KEY>`
- [ ] After getting the latitude and longitude, the app uses this data to fetch the current weather details using the
  OpenWeatherMap Weather API.
    - Endpoint: `https://api.openweathermap.org/data/2.5/weather?lat=<lat>&lon=<lon>&appid=<API_KEY>`
- [ ] Only the following data is displayed on the dashboard:
    - **Location name** (e.g., city name)
    - **Temperature** in Celsius or Fahrenheit
    - **Weather description** (e.g., "clear sky", "light rain")
- [ ] The UI is updated dynamically when the data is fetched successfully, displaying the current weather on the
  dashboard.
- [ ] The app handles errors gracefully, including invalid locations or failed API requests, and displays appropriate
  error messages.

## 🌐 Website public URL

[Github Pages URL](https://kamilwo.github.io/step8up-week5-weather-app)
