document.addEventListener("DOMContentLoaded", (event) => {
  const glassRect = document.querySelector('.glass-rectangle');
  const dashboardContainer = document.querySelector('.dashboard-container');

  const API_KEY = "***";

  // First, get the latitude and longitude for the city
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

  // Call getWeather API when the button is clicked
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  function updateBackground(weatherCondition) {

    glassRect.classList.remove('sunny', 'cloudy', 'partly-cloudy', 'rainy', 'snowy', 'night-sky', 'night-rainy-sky', 'night-cloudy-sky');
    if (weatherCondition.includes('clear') && isDay) {
      glassRect.classList.add('sunny');
    } else if (weatherCondition.includes('cloud')) {
      glassRect.classList.add('cloudy');
    } else if (weatherCondition.includes('rain')) {
      glassRect.classList.add('rainy');
    }
  }

  let visitCount = localStorage.getItem('websiteVisitCount') || 0;
  visitCount++;
  localStorage.setItem('websiteVisitCount', visitCount);
  document.getElementById('visitCount').textContent = visitCount;
});
