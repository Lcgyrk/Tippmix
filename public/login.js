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
function getUsersWithRetry() {
    return __awaiter(this, arguments, void 0, function* (retries = 30, delay = 1000) {
        let attempt = 0;
        while (attempt < retries) {
            yield getUsers();
            if (users.length > 0) {
                return;
            }
            attempt++;
            console.log(`Retry attempt ${attempt}`);
            yield new Promise(resolve => setTimeout(resolve, delay));
        }
        alert("Felhasználók betöltése nem sikerült.");
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        if (usersloaded)
            return;
        try {
            const response = yield fetch("http://localhost:3000/users");
            const data = yield response.json();
            users = data.map((user) => (Object.assign(Object.assign({}, user), { id: Number(user.id) })));
            usersloaded = true;
            console.log("Users loaded:", users);
        }
        catch (error) {
            console.error("Failed to fetch users:", error);
        }
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
        yield getUsersWithRetry();
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
        yield getUsersWithRetry();
        if (users.length == 0) {
            alert("Aszinkron hiba, kérlek próbáld újra");
            return;
        }
        let tryName = document.getElementById("name").value;
        let tryPassword = document.getElementById("password").value;
        let foundUser = users.find(user => user.name === tryName && user.password === tryPassword);
        if (!foundUser) {
            alert("Hibás felhasználónév vagy jelszó!");
            return;
        }
        let currentUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            password: foundUser.password,
            credits: foundUser.credits
        };
        try {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }
        catch (error) {
            console.log("Hiba a bejelentkezett felhasználó frissítésével");
        }
        finally {
            return;
        }
        ;
    });
}
const logButton = document.getElementById("login");
if (logButton) {
    logButton.addEventListener("click", Login);
}
