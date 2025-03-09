var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
import { users } from "./readFile.js";
// DOM elements
const elements = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    regButton: document.getElementById("register"),
    logButton: document.getElementById("login"),
    eye: document.getElementById("eye"),
};
// Password validation constants
const PASSWORD_REQUIREMENTS = {
    minLength: 5,
    pattern: {
        number: /\d/,
        uppercase: /[A-Z]/,
    },
    message: [
        "Jelszó követelmények:",
        "\tlegalább 5 karakter hosszú",
        "\ttartalmaz legalább 1 számot",
        "\ttartalmaz legalább egy nagy betűt",
    ].join("\n"),
};
// Event listeners
(_a = elements.regButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleRegistration);
(_b = elements.logButton) === null || _b === void 0 ? void 0 : _b.addEventListener("click", handleLogin);
(_c = elements.eye) === null || _c === void 0 ? void 0 : _c.addEventListener("mousedown", togglePasswordVisibility);
function handleRegistration(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const newUser = {
            id: users.length + 1,
            name: elements.name.value,
            email: elements.email.value,
            password: elements.password.value,
        };
        if (!validateRegistrationInput(newUser))
            return;
        try {
            const response = yield fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                users.push(newUser);
                alert("Sikeres regisztrálás");
            }
            else {
                throw new Error("Registration failed");
            }
        }
        catch (error) {
            console.error("Sikertelen regisztrálás.", error);
            alert("Sikertelen regisztrálás.");
        }
    });
}
function validateRegistrationInput(user) {
    if (!user.name || !user.email || !user.password) {
        alert("Minden mezőt ki kell tölteni!");
        return false;
    }
    if (users.find((u) => u.name === user.name)) {
        alert("Ez a felhasználónév már foglalt!");
        return false;
    }
    const isValidPassword = user.password.length > PASSWORD_REQUIREMENTS.minLength &&
        PASSWORD_REQUIREMENTS.pattern.number.test(user.password) &&
        PASSWORD_REQUIREMENTS.pattern.uppercase.test(user.password);
    if (!isValidPassword) {
        alert(PASSWORD_REQUIREMENTS.message);
        return false;
    }
    return true;
}
function handleLogin(event) {
    event.preventDefault();
    // let users: User[];
    // if (localStorage.getItem("Users") == null)
    //     users = JSON.parse(localStorage.getItem("allUsers")!);
    // else users = JSON.parse(localStorage.getItem("Users")!);
    // users.forEach((user) => {
    //     if (user.credits == null) {
    //         if (user.name == "admin") user.credits = 9999999;
    //         else user.credits = 1000;
    //     }
    // });
    const usersNoCredit = JSON.parse(localStorage.getItem("allUsers"));
    const localeStorageUsers = JSON.parse(localStorage.getItem("Users"));
    const exist = localeStorageUsers.find((user) => user.name == usersNoCredit[usersNoCredit.length - 1].name);
    if (!exist) {
        const user = {
            id: usersNoCredit[usersNoCredit.length - 1].id,
            name: usersNoCredit[usersNoCredit.length - 1].name,
            email: usersNoCredit[usersNoCredit.length - 1].email,
            password: usersNoCredit[usersNoCredit.length - 1].password,
            credits: 1000,
        };
        localeStorageUsers.push(user);
        localStorage.setItem("Users", JSON.stringify(localeStorageUsers));
    }
    const foundUser = localeStorageUsers.find((user) => user.name === elements.name.value &&
        user.password === elements.password.value);
    console.log(foundUser);
    if (!foundUser) {
        alert("Hibás felhasználónév vagy jelszó!");
        return;
    }
    try {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        window.location.href = "./index.html";
        elements.logButton;
    }
    catch (error) {
        console.error("Hiba a bejelentkezett felhasználó frissítésével", error);
    }
}
function togglePasswordVisibility() {
    const isPassword = elements.password.type === "password";
    elements.password.type = isPassword ? "text" : "password";
    elements.eye.innerHTML = `<i class="fa-solid fa-eye${isPassword ? "-slash" : ""} text-primary"></i>`;
}
