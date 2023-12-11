document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('registerUsername').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('registerPassword').value;    
    var termsCheckbox = document.getElementById('termsCheckbox').checked;

    var termsError = document.getElementById('termsError');


    try {
        const apiURL = 'http://localhost:18804';
        const response = await fetch(`${apiURL}/user/user-register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });


        if (response.ok) {
            if (!termsCheckbox) {
                termsError.innerHTML = "You must agree to the terms and conditions";
                return false;
            }
            alert('Register Successfully! Please login again');
            window.location.href = `login.html?`;
        } else {
            const errorData = await response.json();
            console.error('Registration failed:', errorData.message);
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});
