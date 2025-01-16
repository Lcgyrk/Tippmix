let registrationName = document.getElementById("name") as HTMLInputElement;
let registrationEmail = document.getElementById("email") as HTMLInputElement;
let registrationPassword = document.getElementById("password") as HTMLInputElement;

interface user {
    name: string;
    email: string;
    password: string;
}

let users: user[] = [];

function Registration(){
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
    }
    users.push(user);
    console.log(users);
    
}

document.getElementById("register")!.addEventListener("click", Registration);