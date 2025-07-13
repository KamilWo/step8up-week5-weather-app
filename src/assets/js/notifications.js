document.addEventListener('DOMContentLoaded', () => {
  const notificationsList = document.getElementById('notifications-list');
  const clearAllButton = document.getElementById('clear-all-btn');

  // Function to remove an element with a fade-out animation
  const dismissItem = (item) => {
    item.classList.add('fade-out');
    // Remove the item from the DOM after the animation completes
    item.addEventListener('animationend', () => {
      item.remove();
    });
  };

  // Use event delegation for individual dismiss buttons
  if (notificationsList) {
    notificationsList.addEventListener('click', (event) => {
      const dismissButton = event.target.closest('.dismiss-btn');
      if (dismissButton) {
        const notificationItem = dismissButton.closest('.notification-item');
        if (notificationItem) {
          dismissItem(notificationItem);
        }
      }
    });
  }

  // Add event listener for the "Clear All" button
  if (clearAllButton && notificationsList) {
    clearAllButton.addEventListener('click', () => {
      const allItems = notificationsList.querySelectorAll('.notification-item');
      allItems.forEach(item => {
        dismissItem(item);
      });
    });
  }
});
