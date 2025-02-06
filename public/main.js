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
function displayButtons(buttons, color) {
    // Retrieve stored selections from localStorage
    buttons.forEach((button) => {
        const buttonId = button.id;
        const oddValue = Number(button.innerText);
        // Restore selected state from localStorage
        if (selectedMatches.includes(buttonId)) {
            button.classList.add(`btn-${color}`);
        }
        else {
            button.classList.add(`btn-outline-${color}`);
        }
        // Handle button click
        button.addEventListener("click", () => {
            const index = selectedMatches.indexOf(buttonId);
            if (index !== -1) {
                // Remove if already selected
                selectedMatches.splice(index, 1);
                selectedOdds.splice(index, 1);
                button.classList.remove(`btn-${color}`);
                button.classList.add(`btn-outline-${color}`);
            }
            else {
                // Add if not selected
                selectedMatches.push(buttonId);
                selectedOdds.push(oddValue);
                button.classList.remove(`btn-outline-${color}`);
                button.classList.add(`btn-${color}`);
            }
            // Save updated selections
            localStorage.setItem("selectedMatches", JSON.stringify(selectedMatches));
            localStorage.setItem("selectedOdds", JSON.stringify(selectedOdds));
            console.log("Stored Matches:", selectedMatches);
            console.log("Stored Odds:", selectedOdds);
        });
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
            <div class="mt-3">
                <label for="stake1" class="form-label">Stake Amount ($)</label>
                <input type="number" class="form-control" id="stake1" placeholder="Enter your stake">
            </div>
            <button class="btn btn-success w-100 mt-3" type="button">Place Bet</button>
        </div>
    `;
        });
        const homeButtons = document.querySelectorAll(".home");
        const drawButtons = document.querySelectorAll(".draw");
        const awayButtons = document.querySelectorAll(".away");
        displayButtons(homeButtons, "primary");
        displayButtons(drawButtons, "secondary");
        displayButtons(awayButtons, "danger");
    });
}
// async function displayMatches(sport: string) {
//     const data = await FetchCurrentMatches();
//     const filteredArray = data.filter(
//         (item) => item.sport.toLowerCase() == sport.toLowerCase()
//     );
//     const matchesContainer = document.getElementById("matches-container");
//     matchesContainer!.innerHTML = "";
//     filteredArray.forEach((match) => {
//         matchesContainer!.innerHTML += `
//         <div class="card-body">
//             <h5 class="card-title text-center">
//                 <span class="fw-bold">${
//                     match.homeTeam
//                 }</span> vs <span class="fw-bold">${match.awayTeam}</span>
//             </h5>
//             <div class="d-flex justify-content-around mt-3">
//                 <button id="${match.id}-${
//             match.homeTeam
//         }" class="btn btn-outline-primary match">${match.homeOdds}</button>
//                 ${
//                     match.drawOdds !== null
//                         ? `<button id="${match.id}-draw" class="btn btn-outline-secondary">${match.drawOdds}</button>`
//                         : ``
//                 }
//                 <button id="${match.id}-${
//             match.awayTeam
//         }" class="btn btn-outline-danger">${match.awayOdds}</button>
//             </div>
//             <div class="mt-3">
//                 <label for="stake1" class="form-label">Stake Amount ($)</label>
//                 <input type="number" class="form-control" id="stake1" placeholder="Enter your stake">
//             </div>
//             <button class="btn btn-success w-100 mt-3" type="button">Place Bet</button>
//         </div>
//     `;
//     });
//     const matchButtons = document.querySelectorAll<HTMLButtonElement>(".match");
//     matchButtons.forEach((button) => {
//         button.addEventListener("click", (event) => {
//             const target = event.target as HTMLButtonElement;
//             if (button.classList.contains("btn-primary")) {
//                 allOdds.splice(allOdds.indexOf(Number(target.innerText)), 1);
//                 button.classList.remove("btn-primary");
//                 button.classList.add("btn-outline-primary");
//             } else {
//                 allOdds.push(Number(target.innerText));
//                 button.classList.remove("btn-outline-primary");
//                 button.classList.add("btn-primary");
//             }
//             console.log(allOdds);
//         });
//     });
// }
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
