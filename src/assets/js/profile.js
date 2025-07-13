document.addEventListener('DOMContentLoaded', () => {
  const avatarUpload = document.getElementById('avatar-upload');
  const avatarPreview = document.getElementById('avatar-preview');
  const profileForm = document.getElementById('profile-form');
  const deleteAccountBtn = document.getElementById('delete-account-btn');

  // Handle avatar preview
  if (avatarUpload && avatarPreview) {
    avatarUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          avatarPreview.style.backgroundImage = `url('${e.target.result}')`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Handle form submission
  if (profileForm) {
    profileForm.addEventListener('submit', (event) => {
      event.preventDefault();
      // In a real application, you would send this data to a server
      console.log('Profile form submitted. Implement save logic here.');
      alert('Profile changes saved successfully! (Simulation)');
    });
  }

  // Handle account deletion
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
      // In a real application, you would show a confirmation modal first
      const isConfirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
      if (isConfirmed) {
        console.log('Account deletion initiated. Implement server logic here.');
        alert('Account deleted successfully! (Simulation)');
        // Optionally, redirect the user
        // window.location.href = '/logout';
      }
    });
  }
});
