document.addEventListener('DOMContentLoaded', () => {
  const settingsForm = document.getElementById('settings-form');
  const locationInput = document.getElementById('default-location');
  const deleteLocationBtn = document.getElementById('delete-location-btn');
  const geolocationToggle = document.getElementById('use-geolocation');
  const apiKeyInput = document.getElementById('api-key');

  const SETTINGS_KEY = 'weatherDashSettings';

  // Function to load settings from localStorage
  const loadSettings = () => {
    const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (savedSettings) {
      locationInput.value = savedSettings.defaultLocation || '';
      geolocationToggle.checked = savedSettings.useGeolocation || false;
      apiKeyInput.value = savedSettings.apiKey || '';
    }
  };

  // Function to save settings to localStorage
  const saveSettings = () => {
    const settings = {
      defaultLocation: locationInput.value.trim(),
      useGeolocation: geolocationToggle.checked,
      apiKey: apiKeyInput.value.trim(),
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  // Event listener for form submission
  if (settingsForm) {
    settingsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      saveSettings();
    });
  }

  // Event listener for the delete location button
  if (deleteLocationBtn) {
    deleteLocationBtn.addEventListener('click', () => {
      locationInput.value = '';
      saveSettings();
      alert('Default location cleared. Click "Save Settings" to confirm.');
    });
  }

  // Load the settings when the page is ready
  loadSettings();
});
