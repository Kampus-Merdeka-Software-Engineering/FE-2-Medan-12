document.getElementById('.buttonRegister')
.addEventListener("submit", postRegister)
function postRegister(event){
    event.preEventDefault();
    console.log("test");

    const form = event.target;
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email]').value;
    const password = form.querySelector('[name="password"]').value;
    
    const data = {
        name: name,
        email: email,
        pasword: password
    };

    fetch('http://localhost:5000/user/user-register',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        form.reset();
        alert(data.message);
    });
}  