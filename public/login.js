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
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/users");
        const data = yield response.json();
        users = data.map((user) => (Object.assign(Object.assign({}, user), { id: Number(user.id) })));
        console.log(users);
    });
}
getUsers();
function Registration() {
    return __awaiter(this, void 0, void 0, function* () {
        let id = users.length + 1;
        let name = registrationName.value;
        let email = registrationEmail.value;
        let password = registrationPassword.value;
        let credits = 100;
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
        users.push(user);
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
                const newUser = yield response.json(); // The response will contain the created user with an id
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
document.getElementById("register").addEventListener("click", Registration);
