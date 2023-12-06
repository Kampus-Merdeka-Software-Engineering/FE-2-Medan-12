// Login Register
const card = document.querySelector('.card');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

loginLink.addEventListener('click', ()=>{
    card.classList.remove('active');
});

registerLink.addEventListener('click', ()=>{
    card.classList.add('active');
});


// Fitur Show-Hide di login
let input = document.getElementById('password');
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

// Account
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
