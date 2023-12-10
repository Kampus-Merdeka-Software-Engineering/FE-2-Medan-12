// script.js

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    try {
      const apiURL = 'http://localhost:5000';
      const response = await fetch(`${apiURL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        const result = await response.json();
        // Display a success alert
        alert(result.message);
  
        // Redirect to 'index.html' after successful login
        window.location.href = 'beranda/index.html';
      } else {
        const errorData = await response.json();
        // Display an error alert
        alert('Login failed: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  });
  