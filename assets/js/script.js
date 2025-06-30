document.addEventListener("DOMContentLoaded", () => {

  /* Code setting the API_KEY */
  const apiKeyInput = document.getElementById("api-key");
  // Fetch API Key from local storage if empty
  if (apiKeyInput.value.trim() === "") {
    apiKeyInput.value = localStorage.getItem("OpenWeatherApiKey") || "";
  }

  let API_KEY = apiKeyInput.value.trim() || "YOUR_API_KEY_HERE";

  apiKeyInput.addEventListener("input", () => {
    localStorage.setItem("OpenWeatherApiKey", apiKeyInput.value.trim());
    API_KEY = apiKeyInput.value.trim() || "YOUR_API_KEY_HERE";
  });

  /* Code fetching the Latitude and Longitude */
  // First, get the latitude and longitude for the city
  function getLocation() {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  }

  /* Code fetching the weather data */
  // Call getWeather API when the button is clicked
  function getWeather() {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  }

});
