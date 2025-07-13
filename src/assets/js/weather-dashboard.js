document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const modal = document.getElementById('search-modal');
  const openModalButton = document.getElementById('search-modal-trigger');
  const closeModalButton = document.getElementById('modal-close-button');
  const cancelButton = document.getElementById('modal-cancel-button');
  const cityInput = document.getElementById('city-input');
  const getWeatherButton = document.getElementById('get-weather-button');

  // UI Elements to Update
  const cityNameElement = document.getElementById('city-name');
  const weatherDescElement = document.querySelector('.weather-description');
  const currentTempElement = document.querySelector('.current-temp');
  const feelsLikeElement = document.querySelector('.feels-like');
  const windStatusElement = document.getElementById('wind-status');
  const sunriseElement = document.getElementById('sunrise-time');
  const sunsetElement = document.getElementById('sunset-time');
  const forecastListElement = document.getElementById('forecast-list');
  const glassRect = document.querySelector('.glass-rectangle');
  const dashboardContainer = document.querySelector('.dashboard-container');

  // App State & Config
  const SETTINGS_KEY = 'weatherDashSettings';
  let API_KEY = '';


  // Show an error message (could be improved with a dedicated UI element)
  const showError = (message) => {
    console.error(message);
    cityNameElement.textContent = "Error";
    weatherDescElement.textContent = message;
  };

  // Load settings from localStorage
  const loadAppSettings = () => {
    const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (savedSettings && savedSettings.apiKey) {
      API_KEY = savedSettings.apiKey;
      return savedSettings;
    }
    showError("API Key not found. Please set it in the Settings page.");
    return null;
  };

  // Update the main weather display
  const updateCurrentWeather = (data) => {
    const { name, main, weather, wind, sys } = data;
    cityNameElement.textContent = name;
    weatherDescElement.textContent = weather[0].description.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize
    currentTempElement.textContent = `${Math.round(main.temp)}°C`;
    feelsLikeElement.textContent = `Feels like ${Math.round(main.feels_like)}°C`;
    windStatusElement.textContent = `${wind.speed.toFixed(1)} km/h`;

    // Format sunrise/sunset times
    const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    sunriseElement.textContent = `Sunrise: ${sunriseTime}`;
    sunsetElement.textContent = `Sunset: ${sunsetTime}`;

    updateBackground(weather[0], sys.sunrise, sys.sunset);
  };

  // Update the 5-day forecast display
  const updateForecast = (data) => {
    forecastListElement.innerHTML = ''; // Clear previous forecast

    // Filter to get one forecast per day (around midday)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyForecasts.forEach(forecast => {
      const day = new Date(forecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'short' });
      const temp = `${Math.round(forecast.main.temp)}°C`;
      const iconClass = getWeatherIcon(forecast.weather[0].icon);

      const forecastItem = document.createElement('div');
      forecastItem.className = 'forecast-item';
      forecastItem.innerHTML = `
        <p class="forecast-day">${day}</p>
        <i class="forecast-icon ${iconClass}"></i>
        <p class="forecast-temp">${temp}</p>
      `;
      forecastListElement.appendChild(forecastItem);
    });
  };

  // Map OpenWeatherMap icon codes to Font Awesome icons
  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': 'fas fa-sun', '01n': 'fas fa-moon',
      '02d': 'fas fa-cloud-sun', '02n': 'fas fa-cloud-moon',
      '03d': 'fas fa-cloud', '03n': 'fas fa-cloud',
      '04d': 'fas fa-cloud-meatball', '04n': 'fas fa-cloud-meatball',
      '09d': 'fas fa-cloud-showers-heavy', '09n': 'fas fa-cloud-showers-heavy',
      '10d': 'fas fa-cloud-sun-rain', '10n': 'fas fa-cloud-moon-rain',
      '11d': 'fas fa-bolt', '11n': 'fas fa-bolt',
      '13d': 'fas fa-snowflake', '13n': 'fas fa-snowflake',
      '50d': 'fas fa-smog', '50n': 'fas fa-smog',
    };
    return iconMap[iconCode] || 'fas fa-question-circle'; // Default icon
  };

  // Update the background based on weather and time of day
  const updateBackground = (weather, sunrise, sunset) => {
    const condition = weather.main.toLowerCase();
    const now = Date.now() / 1000; // Current time in seconds
    const isDay = now > sunrise && now < sunset;

    const backgroundClasses = ['sunny', 'cloudy', 'partly-cloudy', 'stormy'];
    glassRect.classList.remove(...backgroundClasses);
    dashboardContainer.classList.remove(...backgroundClasses);

    let bgClass = '';
    if (condition.includes('storm') || condition.includes('thunder')) {
      bgClass = 'stormy';
    } else if (condition.includes('cloud')) {
      bgClass = weather.id === 801 ? 'partly-cloudy' : 'cloudy'; // 801 is 'few clouds'
    } else if (condition.includes('clear')) {
      bgClass = 'sunny';
    }

    if (bgClass) {
      glassRect.classList.add(bgClass);
      dashboardContainer.classList.add(bgClass);
    }
  };

  // Fetch all weather data for a given city
  const fetchWeatherData = async (city) => {
    if (!API_KEY) {
      showError("API Key is missing. Please configure it in settings.");
      return;
    }
    cityNameElement.textContent = `Loading data for ${city}...`;
    weatherDescElement.textContent = 'Please wait...';

    try {
      // Get coordinates for the city
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
      const geoResponse = await fetch(geoUrl);
      if (!geoResponse.ok) throw new Error('Failed to fetch location data.');
      const geoData = await geoResponse.json();
      if (geoData.length === 0) {
        throw new Error(`Could not find location: ${city}`);
      }
      const { lat, lon } = geoData[0];

      // Fetch current weather and forecast in parallel for efficiency
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl)
      ]);

      if (!currentWeatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data.');
      }

      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();

      // Update the UI with the fetched data
      updateCurrentWeather(currentWeatherData);
      updateForecast(forecastData);

    } catch (error) {
      showError(error.message);
    }
  };

  // Modal Logic
  const openModal = () => {
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      setTimeout(() => cityInput.focus(), 100);
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  // Event Listeners
  if (openModalButton) openModalButton.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
  if (cancelButton) cancelButton.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  const handleSearch = () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
      fetchWeatherData(cityName);
      closeModal();
      cityInput.value = '';
    } else {
      cityInput.focus();
    }
  };

  if (getWeatherButton) getWeatherButton.addEventListener('click', handleSearch);
  if (cityInput) cityInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') handleSearch(); });

  // Initial Load
  const settings = loadAppSettings();
  if (settings) {
    if (settings.useGeolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(`lat=${latitude}&lon=${longitude}`); // A bit of a hack, but the geo API can handle this
        },
        (error) => {
          console.warn("Geolocation denied. Falling back to default location.", error);
          if (settings.defaultLocation) {
            fetchWeatherData(settings.defaultLocation);
          }
        }
      );
    } else if (settings.defaultLocation) {
      fetchWeatherData(settings.defaultLocation);
    }
  }
});
