"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let registrationName = document.getElementById("name");
let registrationEmail = document.getElementById("email");
let registrationPassword = document.getElementById("password");
let users = [];
let usersloaded = false;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        if (usersloaded)
            return;
        const response = yield fetch("http://localhost:3000/users");
        const data = yield response.json();
        users = data.map((user) => (Object.assign(Object.assign({}, user), { id: Number(user.id) })));
        usersloaded = true;
        console.log(users);
    });
}
function findUser(userName, userPassword) {
    const foundUser = users.find(user => user.name === userName);
    if (!foundUser) {
        alert("Ilyen felhasználó nincs az adatbázisunkban!");
        return false;
    }
    if (foundUser.password === userPassword) {
        alert("Sikeres bejelentkezés!");
        return true;
    }
    else {
        alert("Hibás jelszó!");
        return false;
    }
}
function Registration() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getUsers();
        let id = users.length + 1;
        let name = registrationName.value;
        let email = registrationEmail.value;
        let password = registrationPassword.value;
        let credits = 100;
        if (name === '' || email === '' || password === '') {
            alert("Minden mezőt ki kell tölteni!");
            return;
        }
        if (users.find(user => user.name === name)) {
            alert("Ez a felhasználónév már foglalt!");
            return;
        }
        let user = {
            id: id,
            name: name,
            email: email,
            password: password,
            credits: credits
        };
        console.log(users);
        try {
            const response = yield fetch("http://localhost:3000/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                const newUser = yield response.json();
                users.push(user);
                console.log("Sikeres regisztrálás", newUser);
                alert('Sikeres regisztrálás');
            }
            else {
                alert('Sikertelen regisztrálás. Próbálja újra!');
            }
        }
        catch (error) {
            console.error('Sikertelen regisztrálás.', error);
            alert('Sikertelen regisztrálás.');
        }
    });
}
const regButton = document.getElementById("register");
if (regButton) {
    regButton.addEventListener("click", Registration);
}
function Login() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getUsers();
        let tryName = document.getElementById("name");
        let tryPassword = document.getElementById("password");
        let loginSuccess = yield findUser(tryName.value, tryPassword.value);
        if (loginSuccess) {
            window.location.href = "index.html";
        }
    });
}
const logButton = document.getElementById("login");
if (logButton) {
    logButton.addEventListener("click", Login);
}
