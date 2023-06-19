// Get references to HTML elements
const settingsForm = document.querySelector('#settings-form');
const siteTitleInput = document.querySelector('#site-title');
const siteDescriptionInput = document.querySelector('#site-description');

// Load initial settings data
loadSettings();

// Listen for form submit event
settingsForm.addEventListener('submit', e => {
  e.preventDefault();
  const settings = {
    siteTitle: siteTitleInput.value,
    siteDescription: siteDescriptionInput.value,
    // Add more settings fields as needed
  };
  saveSettings(settings);
});

// Define functions for managing settings
function loadSettings() {
  // Send AJAX request to server-side API to load settings
  fetch('/api/settings')
    .then(response => response.json())
    .then(settings => {
      // Update form fields with settings data
      siteTitleInput.value = settings.siteTitle;
      siteDescriptionInput.value = settings.siteDescription;
      // Update other form fields as needed
    })
    .catch(error => {
      console.error('Error loading settings:', error);
    });
}

function saveSettings(settings) {
  // Send AJAX request to server-side API to save settings
  fetch('/api/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  })
    .then(response => {
      if (response.ok) {
        // Display success message or perform other action
      } else {
        console.error('Error saving settings:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error saving settings:', error);
    });
}