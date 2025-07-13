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

  const userMenu = document.querySelector('.user-menu');

  if (userMenu) {
    const userProfileButton = userMenu.querySelector('.user-profile-button');

    userProfileButton.addEventListener('click', (event) => {
      // Stop the click from bubbling up to the document, which would close the menu
      event.stopPropagation();
      // Toggle the 'active' class to show/hide the dropdown
      userMenu.classList.toggle('active');
    });

    // Add a listener to the whole document to close the menu if you click elsewhere
    document.addEventListener('click', () => {
      if (userMenu.classList.contains('active')) {
        userMenu.classList.remove('active');
      }
    });

    // Optional but recommended: Close the dropdown with the 'Escape' key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && userMenu.classList.contains('active')) {
        userMenu.classList.remove('active');
      }
    });
  }

  let visitCount = localStorage.getItem('websiteVisitCount') || 0;
  visitCount++;
  localStorage.setItem('websiteVisitCount', visitCount);
  document.getElementById('visitCount').textContent = visitCount;
});
