"use strict";
let users1 = [];
let usersloaded1 = false;
const seeUsers = document.getElementById("userControl");
seeUsers.addEventListener("click", () => {
    const userDiv = document.getElementById("usersList");
    userDiv.innerHTML = "";
});
