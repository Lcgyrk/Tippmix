import { users, User } from "./readFile.js";

// DOM elements
const elements = {
    name: document.getElementById("name") as HTMLInputElement,
    email: document.getElementById("email") as HTMLInputElement,
    password: document.getElementById("password") as HTMLInputElement,
    regButton: document.getElementById("register"),
    logButton: document.getElementById("login"),
    eye: document.getElementById("eye"),
} as const;

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
elements.regButton?.addEventListener("click", handleRegistration);
elements.logButton?.addEventListener("click", handleLogin);
elements.eye?.addEventListener("mousedown", togglePasswordVisibility);

async function handleRegistration(event: Event) {
    event.preventDefault();

    const newUser = {
        id: users.length + 1,
        name: elements.name.value,
        email: elements.email.value,
        password: elements.password.value,
    };

    if (!validateRegistrationInput(newUser)) return;

    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            users.push(newUser);
            alert("Sikeres regisztrálás");
        } else {
            throw new Error("Registration failed");
        }
    } catch (error) {
        console.error("Sikertelen regisztrálás.", error);
        alert("Sikertelen regisztrálás.");
    }
}

function validateRegistrationInput(user: Omit<User, "credits">): boolean {
    if (!user.name || !user.email || !user.password) {
        alert("Minden mezőt ki kell tölteni!");
        return false;
    }

    if (users.find((u) => u.name === user.name)) {
        alert("Ez a felhasználónév már foglalt!");
        return false;
    }

    const isValidPassword =
        user.password.length > PASSWORD_REQUIREMENTS.minLength &&
        PASSWORD_REQUIREMENTS.pattern.number.test(user.password) &&
        PASSWORD_REQUIREMENTS.pattern.uppercase.test(user.password);

    if (!isValidPassword) {
        alert(PASSWORD_REQUIREMENTS.message);
        return false;
    }

    return true;
}

function handleLogin(event: Event) {
    event.preventDefault();

    // if (!users.length) {
    //     alert("Aszinkron hiba, kérlek próbáld újra");
    //     return;
    // }

    // const foundUser = users.find(
    //     (user) =>
    //         user.name === elements.name.value &&
    //         user.password === elements.password.value
    // );
    const localeStorageUsers: User[] = JSON.parse(
        localStorage.getItem("Users")!
    );
    console.log(localeStorageUsers);

    const foundUser = localeStorageUsers.find(
        (user) =>
            user.name === elements.name.value &&
            user.password === elements.password.value
    );
    console.log(foundUser);
    if (!foundUser) {
        alert("Hibás felhasználónév vagy jelszó!");
        return;
    }

    try {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        window.location.href = "./index.html";
        elements.logButton;
    } catch (error) {
        console.error("Hiba a bejelentkezett felhasználó frissítésével", error);
    }
}

function togglePasswordVisibility() {
    const isPassword = elements.password.type === "password";
    elements.password.type = isPassword ? "text" : "password";
    elements.eye!.innerHTML = `<i class="fa-solid fa-eye${
        isPassword ? "-slash" : ""
    } text-primary"></i>`;
}
