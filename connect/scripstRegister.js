document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('registerUsername').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const apiURL = 'http://localhost:5000';
        const response = await fetch(`${apiURL}/user/user-register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            const result = await response.json();
            alert('Register Successfully!');
            window.location.href = `beranda/index.html?`;
        } else {
            const errorData = await response.json();
            console.error('Registration failed:', errorData.message);
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});