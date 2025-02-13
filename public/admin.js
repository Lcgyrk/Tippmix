"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let users1 = [];
let usersloaded1 = false;
function getUsers1() {
    return __awaiter(this, void 0, void 0, function* () {
        if (usersloaded)
            return;
        try {
            const response = yield fetch("http://localhost:3000/users");
            const data = yield response.json();
            users = data.map((user) => (Object.assign(Object.assign({}, user), { id: Number(user.id) })));
            usersloaded = true;
            console.log("Users loaded:", users);
        }
        catch (error) {
            console.error("Failed to fetch users:", error);
        }
    });
}
console.log(users1);
const seeUsers = document.getElementById("userControl");
seeUsers.addEventListener("click", () => {
    const userDiv = document.getElementById("usersList");
    userDiv.innerHTML = "";
});
