document.addEventListener("DOMContentLoaded", (event) => {
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
});
