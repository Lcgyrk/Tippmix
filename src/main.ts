import { FetchBets } from "./readFile.js";

async function GetTenMatch() {
    const data = await FetchBets();
    const matches = getRandomMatches(data, 10);
    const matchesContainer = document.getElementById("matches-container");
    matches.forEach((match) => {
        matchesContainer!.innerHTML += `
        <div class="card-body">
            <h5 class="card-title text-center">
                <span class="fw-bold">${
                    match.homeTeam
                }</span> vs <span class="fw-bold">${match.awayTeam}</span>
            </h5>
            <div class="d-flex justify-content-around mt-3">
                <button id="${match.id}-${
            match.homeTeam
        }" class="btn btn-outline-primary">${match.homeOdds}</button>
                ${
                    match.drawOdds !== null
                        ? `<button id="${match.id}-draw" class="btn btn-outline-secondary">${match.drawOdds}</button>`
                        : ``
                }
                <button id="${match.id}-${
            match.awayTeam
        }" class="btn btn-outline-danger">${match.awayOdds}</button>
            </div>
            <div class="mt-3">
                <label for="stake1" class="form-label">Stake Amount ($)</label>
                <input type="number" class="form-control" id="stake1" placeholder="Enter your stake">
            </div>
            <button class="btn btn-success w-100 mt-3">Place Bet</button>
        </div>
    `;
    });
}

function getRandomMatches<T>(array: T[], count: number): T[] {
    return array.sort(() => Math.random() - 0.5).slice(0, count);
}

GetTenMatch();

document.querySelectorAll("button");
