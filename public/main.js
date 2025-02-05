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
const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
let allOdds = [];
const footballBetting = document.getElementById('football-betting');
footballBetting.addEventListener('click', () => {
    if (!(footballBetting === null || footballBetting === void 0 ? void 0 : footballBetting.classList.contains("loaded"))) {
        footballBetting === null || footballBetting === void 0 ? void 0 : footballBetting.classList.add('loaded');
        GetMatches(5, 'soccer');
    }
});
const basketballBetting = document.getElementById('basketball-betting');
basketballBetting.addEventListener('click', () => {
    if (!(basketballBetting === null || basketballBetting === void 0 ? void 0 : basketballBetting.classList.contains("loaded"))) {
        basketballBetting === null || basketballBetting === void 0 ? void 0 : basketballBetting.classList.add('loaded');
        GetMatches(5, 'basketball');
    }
});
const cricketBetting = document.getElementById('cricket-betting');
cricketBetting.addEventListener('click', () => {
    if (!(cricketBetting === null || cricketBetting === void 0 ? void 0 : cricketBetting.classList.contains("loaded"))) {
        cricketBetting === null || cricketBetting === void 0 ? void 0 : cricketBetting.classList.add('loaded');
        GetMatches(5, 'cricket');
    }
});
const americanFootballBetting = document.getElementById('americanFootball-betting');
americanFootballBetting.addEventListener('click', () => {
    if (!(americanFootballBetting === null || americanFootballBetting === void 0 ? void 0 : americanFootballBetting.classList.contains("loaded"))) {
        americanFootballBetting === null || americanFootballBetting === void 0 ? void 0 : americanFootballBetting.classList.add('loaded');
        GetMatches(5, 'american football');
    }
});
const tennisBetting = document.getElementById('tennis-betting');
tennisBetting.addEventListener('click', () => {
    if (!(tennisBetting === null || tennisBetting === void 0 ? void 0 : tennisBetting.classList.contains("loaded"))) {
        tennisBetting === null || tennisBetting === void 0 ? void 0 : tennisBetting.classList.add('loaded');
        GetMatches(5, 'tennis');
    }
});
function GetMatches(numberOfMatches, typeOfSport) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield FetchBets();
        const matches = getRandomMatches(data, numberOfMatches, typeOfSport);
        const matchesContainer = document.getElementById("matches-container");
        matchesContainer.innerHTML = '';
        matches.forEach((match) => {
            matchesContainer.innerHTML += `
        <div class="card-body">
            <h5 class="card-title text-center">
                <span class="fw-bold">${match.homeTeam}</span> vs <span class="fw-bold">${match.awayTeam}</span>
            </h5>
            <div class="d-flex justify-content-around mt-3">
                <button id="${match.id}-${match.homeTeam}" class="btn btn-outline-primary match">${match.homeOdds}</button>
                ${match.drawOdds !== null
                ? `<button id="${match.id}-draw" class="btn btn-outline-secondary">${match.drawOdds}</button>`
                : ``}
                <button id="${match.id}-${match.awayTeam}" class="btn btn-outline-danger">${match.awayOdds}</button>
            </div>
            <div class="mt-3">
                <label for="stake1" class="form-label">Stake Amount ($)</label>
                <input type="number" class="form-control" id="stake1" placeholder="Enter your stake">
            </div>
            <button class="btn btn-success w-100 mt-3">Place Bet</button>
        </div>
    `;
        });
        const matchButtons = document.querySelectorAll('.match');
        matchButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target;
                if (button.classList.contains("btn-primary")) {
                    allOdds.splice(allOdds.indexOf(Number(target.innerText)), 1);
                    button.classList.remove("btn-primary");
                    button.classList.add("btn-outline-primary");
                }
                else {
                    allOdds.push(Number(target.innerText));
                    button.classList.remove("btn-outline-primary");
                    button.classList.add("btn-primary");
                }
                console.log(allOdds);
            });
        });
    });
}
function getRandomMatches(array, count, typeOfSport) {
    const filteredArray = array.filter(item => (item.sport).toLowerCase() == (typeOfSport).toLocaleLowerCase());
    return filteredArray.sort(() => Math.random() - 0.5).slice(0, count);
}
console.log(allOdds);
