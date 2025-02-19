interface user {
    id: number;
    name: string;
    email: string;
    password: string;
    credits: number;
}

let users1: user[] = [];
let usersloadedForAdmin = false;

const seeUsers = document.getElementById("userControl") as HTMLButtonElement;
seeUsers.addEventListener("click", () => {
    const userDiv = document.getElementById("usersList");
    userDiv!.innerHTML = "";
});

const seeMatches = document.getElementById("matchControl") as HTMLInputElement;
seeMatches.addEventListener("click", () => {
    const matchesDiv = document.getElementById("matchesList");
    matchesDiv!.innerHTML = "";
});

async function showUsers() {
    
}