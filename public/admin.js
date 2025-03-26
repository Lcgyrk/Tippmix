var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { users, FetchBets } from "./readFile.js";
let bets = [];
const seeDiv = document.querySelector(".seeX");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("initiateSearch");
let whichPressed = "";
const seeUsers = document.getElementById("userControl");
seeUsers.addEventListener("click", () => {
    seeDiv.innerHTML = "";
    whichPressed = "user";
    showUsers();
});
const seeMatches = document.getElementById("matchControl");
seeMatches.addEventListener("click", () => {
    seeDiv.innerHTML = "";
    whichPressed = "match";
    showMatches();
});
function showUsers(searchCriteria = "") {
    let tableHTML = `
          <table class="table table-striped mt-3 mx-3 table-responsive">
              <tr>
                  <th>Username</th>
                  <th>E-mail</th>
                  <th>Password</th>
                  <th>Reveal password</th>
              </tr>`;
    users.forEach(user => {
        if (searchCriteria == "" || user.name.toLowerCase().includes(searchCriteria.toLowerCase()) || user.email.toLowerCase().includes(searchCriteria.toLowerCase())) {
            const visibleID = `visible_${user.id}`;
            const hiddenId = `hidden_${user.id}`;
            tableHTML += `
                  <tr>
                      <td>${user.name}</td>
                      <td>${user.email}</td>
                      <td>
                          <span id="${visibleID}" style="display: none">${user.password}</span>
                          <span id="${hiddenId}">********</span>
                      </td>
                      <td>
                          <button class="btn btn-warning" id="btn_${user.id}">
                              Show
                          </button>
                      </td>
                  </tr>`;
        }
    });
    tableHTML += "</table>";
    seeDiv.innerHTML = tableHTML;
    users.forEach(user => {
        const button = document.getElementById(`btn_${user.id}`);
        button === null || button === void 0 ? void 0 : button.addEventListener('click', () => togglePassword(user.id));
    });
}
function togglePassword(userId) {
    const visibleElement = document.getElementById(`visible_${userId}`);
    const hiddenElement = document.getElementById(`hidden_${userId}`);
    if (visibleElement && hiddenElement) {
        visibleElement.style.display = visibleElement.style.display === 'none' ? 'inline' : 'none';
        hiddenElement.style.display = hiddenElement.style.display === 'none' ? 'inline' : 'none';
    }
}
function showMatches() {
    return __awaiter(this, arguments, void 0, function* (searchCritera = "") {
        bets = yield FetchBets();
        let tableHTML = `
          <table class="table table-striped mt-3 mx-3 table-responsive">
              <tr>
                  <th>Sport</th>
                  <th>Home team</th>
                  <th>Away team</th>
                  <th>Home odds</th>
                  <th>Away odds</th>
                  <th>Draw odds</th>
              </tr>`;
        bets.forEach(bet => {
            if (searchCritera == "" || bet.homeTeam.toLowerCase().includes(searchCritera.toLowerCase()) ||
                bet.awayTeam.toLowerCase().includes(searchCritera.toLowerCase()) ||
                bet.sport.toLowerCase().includes(searchCritera.toLowerCase())) {
                if (bet.drawOdds === null) {
                    tableHTML += `
                      <tr>
                          <td>${bet.sport}</td>
                          <td>${bet.homeTeam}</td>
                          <td>${bet.awayTeam}</td>
                          <td>${bet.homeOdds}</td>
                          <td>${bet.awayOdds}</td>
                          <td><span class="text-danger">Nem lehet</span></td>
                      </tr>`;
                }
                else {
                    tableHTML += `
                  <tr>
                      <td>${bet.sport}</td>
                      <td>${bet.homeTeam}</td>
                      <td>${bet.awayTeam}</td>
                      <td>${bet.homeOdds}</td>
                      <td>${bet.awayOdds}</td>
                      <td>${bet.drawOdds}</td>
                  </tr>`;
                }
            }
        });
        tableHTML += "</table>";
        seeDiv.innerHTML = tableHTML;
    });
}
searchButton.addEventListener("click", () => {
    if (searchInput.value == "") {
        searchInput.classList.add("is-invalid");
        alert("Felhasználónévre, sportra vagy csapatra keresés szükséges!");
    }
    else {
        searchInput.classList.remove("is-invalid");
    }
    if (whichPressed == "") {
        alert("Kérem válasszon egy opciót!");
    }
    if (whichPressed == "match") {
        showMatches(searchInput.value);
    }
    ;
    if (whichPressed == "user") {
        showUsers(searchInput.value);
    }
});
const deleteCurrentUserFromLocalStorage = document.getElementById("clearCurrentUser");
deleteCurrentUserFromLocalStorage.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
});
