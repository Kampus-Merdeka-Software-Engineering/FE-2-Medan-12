document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const apiURL = 'http://localhost:5000';
        const response = await fetch(`${apiURL}/user/user-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            alert('Login Successful');
            window.location.href = './beranda/index.html';  // Redirect to beranda page
        } else {
            const errorData = await response.json();
            console.error(`Error: ${response.status} - ${errorData.message}`);
            alert('Login Failed');
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('An error occurred during login');
    }
});
