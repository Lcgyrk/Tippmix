interface user {
    id: number;
    name: string;
    email: string;
    password: string;
    credits: number;
}

let users1: user[] = [];
let usersloaded1 = false;





const seeUsers = document.getElementById("userControl") as HTMLButtonElement;
seeUsers.addEventListener("click", () => {
    const userDiv = document.getElementById("usersList");
    userDiv!.innerHTML = "";
});