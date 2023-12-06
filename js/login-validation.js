function validateLoginForm() {
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('password').value;

    var emailError = document.getElementById('loginEmailError');
    var passwordError = document.getElementById('passwordError');

    // Reset previous error messages
    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    if (email.trim() === "") {
        emailError.innerHTML = "Email must be filled out";
        return false;
    }

    if (password.trim().length < 6) {
        passwordError.innerHTML = "Password must be at least 6 characters";
        return false;
    }

    document.getElementById('loginForm').action = "beranda/index.html";


    return true;
}
