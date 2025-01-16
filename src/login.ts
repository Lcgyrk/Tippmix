let registrationName = document.getElementById("name") as HTMLInputElement;
let registrationEmail = document.getElementById("email") as HTMLInputElement;
let registrationPassword = document.getElementById("password") as HTMLInputElement;

function Registration(){
    let name = registrationName.value;
    let email = registrationEmail.value;
    let password = registrationPassword.value;
    console.log(name, email, password);
    let user = {
        name: name,
        email: email,
        password: password
    }
}

document.getElementById("register")!.addEventListener("click", Registration);