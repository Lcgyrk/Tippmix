var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FetchBets, FetchCurrentMatches } from "./readFile.js";
//localStorage.clear();
let selectedMatches = JSON.parse(localStorage.getItem("selectedMatches") || "[]");
let selectedOdds = JSON.parse(localStorage.getItem("selectedOdds") || "[]");
function getRandomMatches(count, typeOfSport) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield FetchBets();
        const filteredArray = data.filter((item) => item.sport.toLowerCase() == typeOfSport.toLocaleLowerCase());
        const wantedArray = filteredArray
            .sort(() => Math.random() - 0.5)
            .slice(0, count);
        return wantedArray;
    });
}
function sendMatchesToServer(matches, sport) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const match of yield matches) {
            yield fetch("http://localhost:3000/currentMatches", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(match),
            });
        }
        if (sport == "soccer")
            localStorage.setItem("soccerMatches", "true");
        if (sport == "basketball")
            localStorage.setItem("basketballMatches", "true");
        if (sport == "cricket")
            localStorage.setItem("cricketMatches", "true");
        if (sport == "american football")
            localStorage.setItem("americanFootballMatches", "true");
        if (sport == "tennis")
            localStorage.setItem("tennisMatches", "true");
    });
}
function pushBetsToLocalStorage() {
    const homeButtons = document.querySelectorAll(".home");
    const drawButtons = document.querySelectorAll(".draw");
    const awayButtons = document.querySelectorAll(".away");
    displayButtons(homeButtons, "primary");
    displayButtons(drawButtons, "secondary");
    displayButtons(awayButtons, "danger");
    const buttons = document.querySelectorAll(".btn");
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
            console.log(selectedMatches);
            console.log(selectedOdds);
            displayButtons(homeButtons, "primary");
            displayButtons(drawButtons, "secondary");
            displayButtons(awayButtons, "danger");
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
        const data = yield FetchCurrentMatches();
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
                    <button id="${match.id}-${match.homeTeam}" class="btn home">${match.homeOdds}</button>
                    ${match.drawOdds !== null
                ? `<button id="${match.id}-draw" class="btn draw">${match.drawOdds}</button>`
                : ``}
                    <button id="${match.id}-${match.awayTeam}" class="btn away">${match.awayOdds}</button>
                </div>
                
            </div>
        `;
        });
        pushBetsToLocalStorage();
    });
}
let loggedUserString = localStorage.getItem("currentUser");
if (loggedUserString !== null && loggedUserString !== undefined) {
    const loggedUser = JSON.parse(loggedUserString);
    const loginButton = document.getElementById("loginButton");
    loginButton.innerText = `${loggedUser.name}`;
}
const footballBetting = document.getElementById("football-betting");
footballBetting.addEventListener("click", () => {
    const matches = getRandomMatches(3, "soccer");
    if (localStorage.getItem("soccerMatches") !== "true") {
        sendMatchesToServer(matches, "soccer");
    }
    displayMatches("soccer");
});
const basketballBetting = document.getElementById("basketball-betting");
basketballBetting.addEventListener("click", () => {
    const matches = getRandomMatches(3, "basketball");
    if (localStorage.getItem("basketballMatches") !== "true") {
        sendMatchesToServer(matches, "basketball");
    }
    displayMatches("basketball");
});
const cricketBetting = document.getElementById("cricket-betting");
cricketBetting.addEventListener("click", () => {
    const matches = getRandomMatches(3, "cricket");
    if (localStorage.getItem("cricketMatches") !== "true") {
        sendMatchesToServer(matches, "cricket");
    }
    displayMatches("cricket");
});
const americanFootballBetting = document.getElementById("americanFootball-betting");
americanFootballBetting.addEventListener("click", () => {
    const matches = getRandomMatches(3, "american football");
    if (localStorage.getItem("americanFootballMatches") !== "true") {
        sendMatchesToServer(matches, "american football");
    }
    displayMatches("american football");
});
const tennisBetting = document.getElementById("tennis-betting");
tennisBetting.addEventListener("click", () => {
    const matches = getRandomMatches(3, "tennis");
    if (localStorage.getItem("tennisMatches") !== "true") {
        sendMatchesToServer(matches, "tennis");
    }
    displayMatches("tennis");
});
