var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FetchBets } from "./readFile.js";
import { displayBets, placingBet } from "./betting.js";
//localStorage.clear();
let users;
if (localStorage.getItem("Users") == null)
    users = JSON.parse(localStorage.getItem("allUsers"));
else
    users = JSON.parse(localStorage.getItem("Users"));
users.forEach((user) => {
    if (user.credits == null) {
        if (user.name == "admin")
            user.credits = 9999999999999;
        else
            user.credits = 1000;
    }
    if (user.history == null) {
        user.history = {
            profit: 0,
            totalBets: 0,
            betHistory: [],
        };
    }
});
const balance = document.getElementById("balance");
localStorage.setItem("Users", JSON.stringify(users));
let currentUser;
if (localStorage.getItem("currentUser") != null) {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser = users.find((user) => user.name == currentUser.name &&
        user.password == currentUser.password);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    balance.innerHTML = `${currentUser.credits}`;
}
else
    balance.innerHTML = "0";
function getRandomMatches(count) {
    return __awaiter(this, void 0, void 0, function* () {
        const sports = [
            "soccer",
            "basketball",
            "tennis",
            "cricket",
            "american football",
        ];
        const data = yield FetchBets();
        const wantedArray = [];
        sports.forEach((sport) => {
            const filteredArray = data.filter((item) => item.sport.toLowerCase() === sport);
            const randomMatches = filteredArray
                .sort(() => Math.random() - 0.5)
                .slice(0, count);
            wantedArray.push(...randomMatches);
        });
        return wantedArray;
    });
}
function sendMatchesToServer(matches) {
    return __awaiter(this, void 0, void 0, function* () {
        const matchesString = localStorage.getItem("matches");
        let localMatches = [];
        if (matchesString !== null && matchesString !== undefined) {
            localMatches = JSON.parse(matchesString);
        }
        for (const match of yield matches) {
            localMatches.push(match);
        }
        localStorage.setItem("matches", JSON.stringify(localMatches));
        displayMatches("soccer");
    });
}
function pushBetsToLocalStorage() {
    const homeButtons = document.querySelectorAll(".home");
    const drawButtons = document.querySelectorAll(".draw");
    const awayButtons = document.querySelectorAll(".away");
    displayButtons(homeButtons, "primary");
    displayButtons(drawButtons, "secondary");
    displayButtons(awayButtons, "danger");
    displayBets();
    const buttons = document.querySelectorAll(".matchButton");
    buttons.forEach((button) => {
        const buttonId = button.id;
        const oddValue = Number(button.innerText);
        button.addEventListener("click", () => {
            const index = selectedMatches.indexOf(buttonId);
            if (index != -1) {
                selectedMatches.splice(index, 1);
                selectedOdds.splice(index, 1);
            }
            else {
                selectedMatches.push(buttonId);
                selectedOdds.push(oddValue);
            }
            localStorage.setItem("selectedMatches", JSON.stringify(selectedMatches));
            localStorage.setItem("selectedOdds", JSON.stringify(selectedOdds));
            checkDoubleBetOnMatch();
            displayButtons(homeButtons, "primary");
            displayButtons(drawButtons, "secondary");
            displayButtons(awayButtons, "danger");
            displayBets();
        });
    });
}
function checkDoubleBetOnMatch() {
    if (selectedMatches.length < 2)
        return null;
    const lastIdNumber = selectedMatches[selectedMatches.length - 1].split("-")[0];
    selectedMatches.forEach((match) => {
        if (match.split("-")[0] == lastIdNumber &&
            match != selectedMatches[selectedMatches.length - 1]) {
            const index = selectedMatches.indexOf(match);
            selectedMatches.splice(index, 1);
            selectedOdds.splice(index, 1);
            localStorage.setItem("selectedMatches", JSON.stringify(selectedMatches));
            localStorage.setItem("selectedOdds", JSON.stringify(selectedOdds));
            return match;
        }
    });
    return null;
}
function displayButtons(buttons, color) {
    buttons.forEach((button) => {
        if (selectedMatches.includes(button.id)) {
            button.classList.remove(`btn-outline-${color}`);
            button.classList.add(`btn-${color}`);
        }
        else {
            button.classList.remove(`btn-${color}`);
            button.classList.add(`btn-outline-${color}`);
        }
    });
}
function displayMatches(sport) {
    return __awaiter(this, void 0, void 0, function* () {
        const matches = localStorage.getItem("matches");
        let data = JSON.parse(matches);
        const filteredArray = data.filter((item) => item.sport.toLowerCase() === sport.toLowerCase());
        const matchesContainer = document.getElementById("matches-container");
        matchesContainer.innerHTML = "";
        filteredArray.forEach((match) => {
            matchesContainer.innerHTML += `
        <div class="card-body">
            <h5 class="card-title text-center">
                <span class="fw-bold">${match.homeTeam}</span> vs 
                <span class="fw-bold">${match.awayTeam}</span>
            </h5>
            <div class="d-flex justify-content-around mt-3">
            <button id="${match.id}-${match.homeTeam}" class="btn home matchButton">${match.homeOdds}</button>
                ${match.drawOdds !== null
                ? `<button id="${match.id}-draw" class="btn draw matchButton">${match.drawOdds}</button>`
                : ``}
                <button id="${match.id}-${match.awayTeam}" class="btn away matchButton">${match.awayOdds}</button>
            </div>
    `;
        });
        pushBetsToLocalStorage();
    });
}
const BetButton = document.getElementById("place-bet");
if (!localStorage.getItem("currentUser"))
    BetButton.disabled = true;
BetButton.addEventListener("click", () => {
    const betAmount = document.getElementById("bet-amount");
    const betAmountValue = Number(betAmount.value);
    if (betAmountValue > currentUser.credits ||
        betAmountValue <= 0 ||
        selectedMatches.length == 0) {
        alert("Incorrect bet placement");
        return;
    }
    const simulationWindow = document.getElementById("simulating-window");
    simulationWindow.classList.remove("d-none");
    setTimeout(() => {
        simulationWindow.classList.add("d-none"), placingBet();
    }, 2000);
    const modalClose = document.getElementById("modalClose");
    modalClose.addEventListener("click", () => {
        localStorage.removeItem("selectedOdds");
        localStorage.removeItem("selectedMatches");
        localStorage.removeItem("matches");
        selectedMatches = [];
        selectedOdds = [];
        location.reload();
    });
});
if (localStorage.getItem("matches") == null) {
    const matches = getRandomMatches(5);
    sendMatchesToServer(matches);
}
setTimeout(() => {
    displayMatches("soccer");
}, 50);
let selectedMatches = JSON.parse(localStorage.getItem("selectedMatches") || "[]");
let selectedOdds = JSON.parse(localStorage.getItem("selectedOdds") || "[]");
const loginButton = document.getElementById("loginButton");
let userString = localStorage.getItem("currentUser");
if (userString !== null && userString !== undefined) {
    let user = JSON.parse(userString);
    loginButton.innerText = `${user.name}`;
}
const bettingIcon = document.getElementById("icon");
const footballBetting = document.getElementById("football-betting");
footballBetting.addEventListener("click", () => {
    bettingIcon.innerHTML = "";
    bettingIcon.className = "fas fa-futbol";
    displayMatches("soccer");
});
const basketballBetting = document.getElementById("basketball-betting");
basketballBetting.addEventListener("click", () => {
    bettingIcon.innerHTML = "";
    bettingIcon.className = "fas fa-basketball";
    displayMatches("basketball");
});
const cricketBetting = document.getElementById("cricket-betting");
cricketBetting.addEventListener("click", () => {
    bettingIcon.className = "";
    bettingIcon.innerHTML = `<img src="images/cricket_ball.svg" alt="" width="25px" style="vertical-align: top">`;
    displayMatches("cricket");
});
const americanFootballBetting = document.getElementById("americanFootball-betting");
americanFootballBetting.addEventListener("click", () => {
    bettingIcon.innerHTML = "";
    bettingIcon.className = "fas fa-football-ball";
    displayMatches("american football");
});
const tennisBetting = document.getElementById("tennis-betting");
tennisBetting.addEventListener("click", () => {
    bettingIcon.className = "";
    bettingIcon.innerHTML = `<img src="images/tennis.svg" alt="" width="25px" style="vertical-align: top">`;
    displayMatches("tennis");
});
const deleteCurrentUserFromLocalStorage = document.getElementById("clearCurrentUser");
deleteCurrentUserFromLocalStorage.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    loginButton.innerHTML = `<i class="fas fa-user"></i> Login`;
    balance.innerHTML = "0";
    window.location.reload();
});
export { selectedMatches, selectedOdds, users, currentUser };
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    updateNavigation();
});
function updateNavigation() {
    const loginNavItem = document.querySelector('.nav-item:has(a[href="./login.html"])');
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (loginNavItem && currentUser.name == "admin") {
        loginNavItem.innerHTML = `
            <a class="nav-link" href="./admin_interface.html">
                <i class="fas fa-user"></i> ${currentUser.name ? currentUser.name : "Login"}
            </a>
        `;
    }
    else if (loginNavItem && currentUser.email) {
        loginNavItem.innerHTML = `
            <a class="nav-link" href="./user_profile.html">
                <i class="fas fa-user"></i> ${currentUser.name ? currentUser.name : "Login"}
            </a>
        `;
    }
}
