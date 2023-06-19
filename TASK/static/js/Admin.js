// Get references to HTML elements
const userList = document.querySelector('#user-list');
const contentList = document.querySelector('#content-list');
const settingsForm = document.querySelector('#settings-form');

// Load initial data
loadUsers();
loadContent();
loadSettings();

// Listen for form submit events
userList.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userId = formData.get('user-id');
  const action = formData.get('action');
  if (action === 'delete') {
    deleteUser(userId);
  } else if (action === 'edit') {
    editUser(userId);
  }
});

contentList.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const contentId = formData.get('content-id');
  const action = formData.get('action');
  if (action === 'delete') {
    deleteContent(contentId);
  } else if (action === 'edit') {
    editContent(contentId);
  }
});

settingsForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const settings = {
    siteTitle: formData.get('site-title'),
    siteDescription: formData.get('site-description'),
    // Add more settings as needed
  };
  saveSettings(settings);
});

// Define functions for managing users, content, and settings
function loadUsers() {
  // Send AJAX request to server-side API to load users
  // Update userList HTML element with user data
}

function deleteUser(userId) {
  // Send AJAX request to server-side API to delete user
  // Update userList HTML element with updated user data
}

function editUser(userId) {
  // Send AJAX request to server-side API to load user data
  // Update userList HTML element with user edit form
}

function loadContent() {
  // Send AJAX request to server-side API to load content
  // Update contentList HTML element with content data
}

function deleteContent(contentId) {
  // Send AJAX request to server-side API to delete content
  // Update contentList HTML element with updated content data
}

function editContent(contentId) {
  // Send AJAX request to server-side API to load content data
  // Update contentList HTML element with content edit form
}

function loadSettings() {
  // Send AJAX request to server-side API to load settings
  // Update settingsForm HTML element with settings data
}

function saveSettings(settings) {
  // Send AJAX request to server-side API to save settings
  // Update settingsForm HTML element with saved settings data
}
// Get references to HTML elements

const addUserForm = document.querySelector('#add-user-form');
const editUserForm = document.querySelector('#edit-user-form');

// Load initial user data
loadUsers();

// Listen for form submit events
addUserForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const user = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    // Add more user fields as needed
  };
  addUser(user);
  addUserForm.reset();
});

editUserForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const user = {
    id: formData.get('user-id'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    // Add more user fields as needed
  };
  editUser(user);
  editUserForm.reset();
});

// Define functions for managing users
function loadUsers() {
  // Send AJAX request to server-side API to load users
  fetch('/api/users')
    .then(response => response.json())
    .then(users => {
      // Update userList HTML element with user data
      userList.innerHTML = '';
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <span>${user.username}</span>
          <span>${user.email}</span>
          <button class="delete-user" data-user-id="${user.id}">Delete</button>
          <button class="edit-user" data-user-id="${user.id}">Edit</button>
        `;
        userList.appendChild(listItem);
      });
      // Add event listeners for delete and edit buttons
      const deleteButtons = document.querySelectorAll('.delete-user');
      const editButtons = document.querySelectorAll('.edit-user');
      deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
          const userId = button.getAttribute('data-user-id');
          deleteUser(userId);
        });
      });
      editButtons.forEach(button => {
        button.addEventListener('click', () => {
          const userId = button.getAttribute('data-user-id');
          loadUser(userId);
        });
      });
    })
    .catch(error => {
      console.error('Error loading users:', error);
    });
}

function loadUser(userId) {
  // Send AJAX request to server-side API to load user data
  fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      // Populate editUserForm with user data
      editUserForm.querySelector('#user-id').value = user.id;
      editUserForm.querySelector('#username').value = user.username;
      editUserForm.querySelector('#email').value = user.email;
      // Set password field to empty string to avoid pre-filling it with the hashed password
      editUserForm.querySelector('#password').value = '';
    })
    .catch(error => {
      console.error(`Error loading user with ID ${userId}:`, error);
    });
}

function addUser(user) {
  // Send AJAX request to server-side API to add user
  fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (response.ok) {
        loadUsers();
      } else {
        console.error('Error adding user:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error adding user:', error);
    });
}

function editUser(user) {
  // Send AJAX request to server-side API to edit user
  fetch(`/api/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (response.ok) {
        loadUsers();
      } else {
        console.error('Error editing user:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error editing user:', error);
    });
}

function deleteUser(userId) {
  // Send AJAX request to server-side API to delete user
  fetch(`/api/users/${userId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        loadUsers();
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });
}