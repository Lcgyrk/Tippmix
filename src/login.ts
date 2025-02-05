let registrationName = document.getElementById("name") as HTMLInputElement;
let registrationEmail = document.getElementById("email") as HTMLInputElement;
let registrationPassword = document.getElementById("password") as HTMLInputElement;

interface user {
    id: number;
    name: string;
    email: string;
    password: string;
    credits: number;
}

let users: user[] = [];
let usersloaded = false;

async function getUsersWithRetry(retries: number = 30, delay: number = 1000) {
    let attempt = 0;
    while (attempt < retries) {
        await getUsers();
        if (users.length > 0) {
            return;
        }
        attempt++;
        console.log(`Retry attempt ${attempt}`);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    alert("Felhasználók betöltése nem sikerült.");
}

async function getUsers(){
    if (usersloaded) return;

    try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();

        users = data.map((user: any) => ({
            ...user,
            id: Number(user.id)
        }));

        usersloaded = true;
        console.log("Users loaded:", users);
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}

function findUser(userName: string, userPassword: string) : boolean{
    const foundUser = users.find(user => user.name === userName);

    if (!foundUser) {
        alert("Ilyen felhasználó nincs az adatbázisunkban!");
        return false;
    }

    if (foundUser.password === userPassword) {
        alert("Sikeres bejelentkezés!");
        return true;
    } else {
        alert("Hibás jelszó!");
        return false;
    }
}


async function Registration(){
    await getUsersWithRetry();

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
    }
    console.log(users);
    
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const newUser = await response.json();
            users.push(user);
            console.log("Sikeres regisztrálás", newUser);
            alert('Sikeres regisztrálás');
        } else {
            alert('Sikertelen regisztrálás. Próbálja újra!');
        }
    } catch (error) {
        console.error('Sikertelen regisztrálás.', error);
        alert('Sikertelen regisztrálás.');
    }
}

const regButton = document.getElementById("register");
if (regButton) {
    regButton.addEventListener("click", Registration);
}

async function Login() {
    await getUsersWithRetry();

    if (users.length == 0) {
        alert("Aszinkron hiba, kérlek próbáld újra");
        return;
    }

    let tryName = (document.getElementById("name") as HTMLInputElement).value;
    let tryPassword = (document.getElementById("password") as HTMLInputElement).value;

    let foundUser = users.find(user => user.name === tryName && user.password === tryPassword);

    if (!foundUser) {
        alert("Hibás felhasználónév vagy jelszó!");
        return;
    }

    let currentUser: user = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        password: foundUser.password,
        credits: foundUser.credits
    };

    
}

const logButton = document.getElementById("login");
if (logButton) {
    logButton.addEventListener("click", Login);
}