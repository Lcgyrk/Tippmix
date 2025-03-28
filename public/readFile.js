var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let users = [];
let usersloaded = false;
export function FetchBets() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/bets");
        if (!response.ok)
            throw new Error(response.statusText);
        return yield response.json();
    });
}
function FetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        if (usersloaded)
            return;
        try {
            const response = yield fetch("http://localhost:3000/users");
            const data = yield response.json();
            users = data.map((user) => (Object.assign(Object.assign({}, user), { id: Number(user.id) })));
            usersloaded = true;
            localStorage.setItem("allUsers", JSON.stringify(users));
        }
        catch (error) {
            console.error("Failed to fetch users:", error);
        }
    });
}
FetchUsers();
export { users };
