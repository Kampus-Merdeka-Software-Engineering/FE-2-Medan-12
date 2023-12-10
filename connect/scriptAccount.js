const userId = JSON.parse(localStorage.getItem('currentUser')).id;

// Fetch user profile based on the user ID
fetch(`http://localhost:5000/user/user/profile/${userId}`)
  .then((response) => response.json())
  .then((data) => {
    // Update the profile section with user data
    const profileElement = document.getElementById('profile');
    profileElement.innerHTML = `
      <h2>${data.data.name}</h2>
      <p>${data.data.email}</p>
    `;
  })
  .catch((error) => {
    console.error('Error fetching user profile:', error);
  });

apiURL = 'http://localhost:5000';
// Fetch user profile based on the user ID
fetch(`${apiURL}/user/user/profile/${userId}`)
  .then((response) => response.json())
  .then((data) => {
    // Update the profile section with user data
    const profileElement = document.getElementById('profile');
    profileElement.innerHTML = `
      <h2>${data.data.name}</h2>
      <p>${data.data.email}</p>
      <p id="loginStatus"></p>
    `;
  })
  .catch((error) => {
    console.error('Error fetching user profile:', error);
  });



  function updateUserProfile() {
    const newNameElement = document.getElementById('newName');
    const newEmailElement = document.getElementById('newEmail');
  
    // Check if userId is defined
    if (!userId) {
      console.error('Error: userId is not defined.');
      return;
    }
  
    // Check if apiURL is defined
    if (!apiURL) {
      console.error('Error: apiURL is not defined.');
      return;
    }
  
    // Get the values from the input elements
    const newName = newNameElement.value;
    const newEmail = newEmailElement.value;
  
    fetch(`${apiURL}/user/user/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName, email: newEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  }
  

