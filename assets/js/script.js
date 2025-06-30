document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("api-key");
  // Fetch API Key from local storage if empty
  if (apiKeyInput.value.trim() === "") {
    apiKeyInput.value = localStorage.getItem("OpenWeatherApiKey") || "";
  }
  let API_KEY = apiKeyInput.value.trim() || "YOUR_API_KEY_HERE";

  // First, get the latitude and longitude for the city
//   const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

  // Call getWeather API when the button is clicked
//   const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  apiKeyInput.addEventListener("input", () => {
    localStorage.setItem("OpenWeatherApiKey", apiKeyInput.value.trim());
    API_KEY = apiKeyInput.value.trim() || "YOUR_API_KEY_HERE";
  });
});
