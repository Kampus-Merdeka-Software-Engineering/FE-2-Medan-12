document.addEventListener('DOMContentLoaded', function () {
    const card = document.querySelector('.card');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const registerForm = document.getElementById('registerForm');
  
    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const isValid = validateRegisterForm();
  
        if (isValid) {
            try {
                const username = document.getElementById('registerUsername').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('registerPassword').value;
                const apiURL =  "https://be-2-medan-12.up.railway.app"

                const response = await fetch(`${apiURL}/user/user-register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });
  
                const result = await response.json();
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    });
  
    loginLink.addEventListener('click', () => {
        card.classList.remove('active');
    });
  
    registerLink.addEventListener('click', () => {
        card.classList.add('active');
    });

    function validateRegisterForm() {
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('registerPassword').value;
        const termsCheckbox = document.getElementById('termsCheckbox');
        const termsError = document.getElementById('termsError');
  
        if (!username.trim() || !email.trim() || !password.trim()) {
            showError(termsError, 'All fields are required.');
            return false;
        }
  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(termsError, 'Invalid email format.');
            return false;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        
        if (!passwordRegex.test(password)) {
            showError(termsError, 'Password at least 8 characters with letters and numbers.');
            return false;
        }

        if (!termsCheckbox.checked) {
            showError(termsError, 'Please agree to the terms & conditions.');
            return false;
        }

        return true;
    }
  
    function showError(element, message) {
        element.innerHTML = message;
        element.style.display = 'block';
    }
  });


let input = document.getElementById('loginPassword');
let inputR = document.getElementById('registerPassword');
let icon = document.getElementById('icon');

function action(){
    if(input.type == 'text'){
        input.type = 'password';
        icon.src = 'img/show-hide.png';
    }else{
        input.type = 'text';
        icon.src = 'img/show-hide.png';
    }
}

function actionn(){
    if(inputR.type == 'text'){
        inputR.type = 'password';
        icon.src = 'img/show-hide.png';
    }else{
        inputR.type = 'text';
        icon.src = 'img/show-hide.png';
    }
}

function toggleEditForm() {
    var editForm = document.getElementById("editForm");
    editForm.style.display = (editForm.style.display === "none" || editForm.style.display === "") ? "block" : "none";
  }
  function saveChanges() {
    var newName = document.getElementById("newName").value;
    document.querySelector(".profile-left h2").innerText = newName;
    document.querySelector(".profile-right h1").innerText = ("Hello, "+newName);
    toggleEditForm();
  };

function alertLogin() {
    var aRoom = document.getElementById('reserve-room');
    if (aRoom) {
        aRoom.addEventListener('click', function() {
            alert('Login Required! Please login to reserve a room.');
        });
    } else {
        console.error("Element with ID 'reserve-room' not found");
    }
}
function alertLoginSearch() {
    var search = document.getElementById('btn-search')
        if (search) {
        search.addEventListener('click', function() {
            alert('Login Required! Please login to search a room.');
        });
    } else {
        console.error("Element with ID 'reserve-room' not found");
    }
}



