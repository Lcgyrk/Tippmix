import { Bet } from "types.ts";

const matchesContainer = document.getElementById("matches-container") as HTMLElement;

async function fetchBets(): Promise<Bet[]> {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data.bets;
}

function displayBets(bets: Bet[]): void {
    matchesContainer.innerHTML = "";
    bets.forEach((bet) => {
        const matchDiv = document.createElement("div");
        matchDiv.classList.add("match-card");
        matchDiv.innerHTML = `
            <h5>${bet.homeTeam} vs. ${bet.awayTeam}</h5>
            <p>Odds: Home ${bet.homeOdds}, Away ${bet.awayOdds}, ${
            bet.drawOdds ? `Draw ${bet.drawOdds}` : ""
        }</p>
            <button class="btn btn-primary" onclick="selectBet(${bet.id})">Select</button>
        `;
        matchesContainer.appendChild(matchDiv);
    });
}

async function init() {
    const bets = await fetchBets();
    displayBets(bets);
}

init();