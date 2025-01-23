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
async function getUsers(){
    if (usersloaded) return;

    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();

    users = data.map((user: any) => ({
        ...user,
        id: Number(user.id)
    }));

    usersloaded = true;
    console.log(users);
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
    await getUsers();

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
    await getUsers();

    let tryName = document.getElementById("name") as HTMLInputElement;
    let tryPassword = document.getElementById("password") as HTMLInputElement;

    let loginSuccess = await findUser(tryName.value, tryPassword.value);

    if (loginSuccess) {
        window.location.href = "index.html";
    }
}

const logButton = document.getElementById("login");
if (logButton) {
    logButton.addEventListener("click", Login);
}