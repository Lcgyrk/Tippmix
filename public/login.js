"use strict";
let registrationName = document.getElementById("name");
let registrationEmail = document.getElementById("email");
let registrationPassword = document.getElementById("password");
function Registration() {
    let name = registrationName.value;
    let email = registrationEmail.value;
    let password = registrationPassword.value;
    console.log(name, email, password);
    let user = {
        name: name,
        email: email,
        password: password
    };
}
document.getElementById("register").addEventListener("click", Registration);
