document.addEventListener("DOMContentLoaded", (event) => {
  // Modal Elements
  const modal = document.getElementById('search-modal');
  const modalPanel = document.getElementById('modal-panel');
  const openModalButton = document.getElementById('search-modal-trigger');
  const closeModalButton = document.getElementById('modal-close-button');
  const cancelButton = document.getElementById('modal-cancel-button');
  const cityInput = document.getElementById('city-input');
  const getWeatherButton = document.getElementById('get-weather-button');

  // Weather space
  const glassRect = document.querySelector('.glass-rectangle');
  const dashboardContainer = document.querySelector('.dashboard-container');

  // Date and Time Display
  const currentDateTimeElement = document.getElementById('current-date-time');

  function updateDateTime() {
    const now = new Date();

    // Format the date: e.g., "July 12, 2025"
    const dateOptions = {month: 'long', day: 'numeric', year: 'numeric'};
    const formattedDate = now.toLocaleDateString('en-GB', dateOptions);

    // Format the time: e.g., "03:30"
    const timeOptions = {hour: '2-digit', minute: '2-digit', second: '2-digit', hour24: true};
    const formattedTime = now.toLocaleTimeString('en-GB', timeOptions);

    if (currentDateTimeElement) {
      currentDateTimeElement.textContent = `${formattedDate} | ${formattedTime}`;
    }
  }

  // Update the time immediately when the page loads
  updateDateTime();
  // Then, update the time every second (1000 milliseconds)
  setInterval(updateDateTime, 1000);


  // --- Functions to open and close the modal ---
  const openModal = () => {
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex'); // Use flex to center the content
      // Set focus on the input field for better accessibility
      setTimeout(() => cityInput.focus(), 100);
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  // Open modal when the search icon is clicked
  if (openModalButton) {
    openModalButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the link from navigating
      openModal();
    });
  }

  // Close modal with the 'X' button
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  // Close modal with the 'Cancel' button
  if (cancelButton) {
    cancelButton.addEventListener('click', closeModal);
  }

  // Close modal when clicking on the background overlay
  if (modal) {
    modal.addEventListener('click', (event) => {
      // If the click is on the modal background (not the panel), close it
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal when the 'Escape' key is pressed
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // --- Form Submission Logic ---
  if (getWeatherButton) {
    getWeatherButton.addEventListener('click', () => {
      const cityName = cityInput.value.trim();
      if (cityName) {
        // TODO: Add your logic to fetch weather for the cityName
        console.log(`Fetching weather for: ${cityName}`);
        // You can close the modal after searching
        closeModal();
        // Clear the input for next time
        cityInput.value = '';
      } else {
        // Optional: show an error or highlight the input
        console.log('City name is empty.');
        cityInput.focus();
      }
    });
  }

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
