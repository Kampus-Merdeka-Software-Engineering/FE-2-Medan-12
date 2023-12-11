const userId = JSON.parse(localStorage.getItem('currentUser')).id;

fetch(`http://localhost:31132/user/user/profile/${userId}`)
  .then((response) => response.json())
  .then((data) => {
    const profileElement = document.getElementById('profile');
    profileElement.innerHTML = `
      <h2>${data.data.name}</h2>
      <p>${data.data.email}</p>
    `;
  })
  .catch((error) => {
    console.error('Error fetching user profile:', error);
  });

apiURL = 'http://localhost:31132';
fetch(`${apiURL}/user/user/profile/${userId}`)
  .then((response) => response.json())
  .then((data) => {
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
  
    if (!userId) {
      console.error('Error: userId is not defined.');
      return;
    }
  
    if (!apiURL) {
      console.error('Error: apiURL is not defined.');
      return;
    }
  
    const newName = newNameElement.value;
    const newEmail = newEmailElement.value;
  
    if (!newEmail.includes('@')) {
      alert('Email must contain "@" symbol.');
      return;
    }
  
    fetch(`${apiURL}/user/user/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName, email: newEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Berhasil terganti');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  }
  
  

