document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const profileForm = document.getElementById('profile-form');
  const avatarUpload = document.getElementById('avatar-upload');
  const avatarPreview = document.getElementById('avatar-preview');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const emailConfirmInput = document.getElementById('email-confirm');
  const notificationsToggle = document.getElementById('email-notifications');
  const deleteAccountBtn = document.getElementById('delete-account-btn');

  const PROFILE_KEY = 'weatherDashProfile';

  // Load profile data from localStorage
  const loadProfile = () => {
    const savedProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if (savedProfile) {
      usernameInput.value = savedProfile.username || 'Kamil Wozniak';
      emailInput.value = savedProfile.email || 'kamil.wozniak@example.com';
      emailConfirmInput.value = savedProfile.email || 'kamil.wozniak@example.com';
      notificationsToggle.checked = savedProfile.emailNotifications ?? true; // Default to true if not set
      if (savedProfile.avatar) {
        avatarPreview.style.backgroundImage = `url('${savedProfile.avatar}')`;
      }
    }
  };

  // Save profile data to localStorage
  const saveProfile = () => {
    if (emailInput.value !== emailConfirmInput.value) {
      alert('Email addresses do not match. Please correct them.');
      emailConfirmInput.focus();
      return;
    }

    // Get existing avatar from storage to avoid overwriting it if not changed
    const currentProfile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
    const newAvatar = avatarPreview.style.backgroundImage.slice(5, -2); // Extract URL

    const profileData = {
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      emailNotifications: notificationsToggle.checked,
      // Use the new avatar if it's a data URL, otherwise keep the old one
      avatar: newAvatar.startsWith('data:image') ? newAvatar : currentProfile.avatar,
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));
    alert('Profile changes saved successfully!');
  };

  // Handle form submission
  if (profileForm) {
    profileForm.addEventListener('submit', (event) => {
      event.preventDefault();
      saveProfile();
    });
  }

  // Handle avatar preview and save it directly
  if (avatarUpload && avatarPreview) {
    avatarUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newAvatarUrl = e.target.result;
          avatarPreview.style.backgroundImage = `url('${newAvatarUrl}')`;

          // Save avatar change immediately to localStorage
          const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
          profile.avatar = newAvatarUrl;
          localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Handle account deletion
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
      const isConfirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
      if (isConfirmed) {
        // In a real app, you'd call a server. Here, we clear local data.
        localStorage.removeItem(PROFILE_KEY);
        localStorage.removeItem(SETTINGS_KEY); // Also clear settings
        alert('Account data cleared from this browser! (Simulation)');
        // Optionally, redirect the user
        window.location.href = './weather-dashboard.html';
      }
    });
  }

  loadProfile();
});
