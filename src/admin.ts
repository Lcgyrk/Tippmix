interface user {
    id: number;
    name: string;
    email: string;
    password: string;
    credits: number;
}

let users1: user[] = [];
let usersloaded1 = false;

async function getUsers1(){
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

console.log(users1);


const seeUsers = document.getElementById("userControl") as HTMLButtonElement;
seeUsers.addEventListener("click", () => {
    const userDiv = document.getElementById("usersList");
    userDiv!.innerHTML = "";
});