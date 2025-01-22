"use strict";
let registrationName = document.getElementById("name");
let registrationEmail = document.getElementById("email");
let registrationPassword = document.getElementById("password");
let users = [];
function Registration() {
    let name = registrationName.value;
    let email = registrationEmail.value;
    let password = registrationPassword.value;
    if (users.find(user => user.name === name)) {
        alert("Ez a felhasználónév már foglalt!");
        return;
    }
    let user = {
        name: name,
        email: email,
        password: password
    };
    users.push(user);
    console.log(users);
}
document.getElementById("register").addEventListener("click", Registration);
