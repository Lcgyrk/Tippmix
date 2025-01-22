var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const matchesContainer = document.getElementById("matches-container");
function fetchBets() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("./data.json");
        const data = yield response.json();
        return data.bets;
    });
}
function displayBets(bets) {
    matchesContainer.innerHTML = "";
    bets.forEach((bet) => {
        const matchDiv = document.createElement("div");
        matchDiv.classList.add("match-card");
        matchDiv.innerHTML = `
            <h5>${bet.homeTeam} vs. ${bet.awayTeam}</h5>
            <p>Odds: Home ${bet.homeOdds}, Away ${bet.awayOdds}, ${bet.drawOdds ? `Draw ${bet.drawOdds}` : ""}</p>
            <button class="btn btn-primary" onclick="selectBet(${bet.id})">Select</button>
        `;
        matchesContainer.appendChild(matchDiv);
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const bets = yield fetchBets();
        displayBets(bets);
    });
}
init();
export {};
