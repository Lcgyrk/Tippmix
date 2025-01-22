import { User } from "types.ts";

async function fetchUser(): Promise<User> {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data.users[0];
}

async function init() {
    const user = await fetchUser();
    const balanceElement = document.getElementById("userBalance") as HTMLElement;
    balanceElement.textContent = user.credits?.toString() || "0";
}

init();
