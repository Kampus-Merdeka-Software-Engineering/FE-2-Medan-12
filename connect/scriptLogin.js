document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const apiURL = 'https://be-2-medan-12.up.railway.app';
    const response = await fetch(`${apiURL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);

      localStorage.setItem('currentUser', JSON.stringify(result.user));
      window.location.href = 'beranda/index.html';
    } else {
      const errorData = await response.json();
      alert('Login failed: ' + errorData.error);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
});
