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

async function getUsers() {

    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();

    users = data.map((user: any) => ({
        ...user,
        id: Number(user.id)
    }));

    console.log(users);
}
getUsers();


async function Registration(){
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
    }

    users.push(user);
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
            const newUser = await response.json();  // The response will contain the created user with an id
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

document.getElementById("register")!.addEventListener("click", Registration);