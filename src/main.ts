import { FetchBets, FetchCurrentMatches, Bet } from "./readFile.js";
localStorage.clear();
async function getRandomMatches(
    count: number,
    typeOfSport: string
): Promise<Bet[]> {
    const data = await FetchBets();
    const filteredArray = data.filter(
        (item) => item.sport.toLowerCase() == typeOfSport.toLocaleLowerCase()
    );
    const wantedArray = filteredArray
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
    return wantedArray;
}
async function sendMatchesToServer(matches: Promise<Bet[]>, sport: string) {
    for (const match of await matches) {
        await fetch("http://localhost:3000/currentMatches", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(match),
        });
    }
    if (sport == "soccer") localStorage.setItem("soccerMatches", "true");
    if (sport == "basketball")
        localStorage.setItem("basketballMatches", "true");
    if (sport == "cricket") localStorage.setItem("cricketMatches", "true");
    if (sport == "american football")
        localStorage.setItem("americanFootballMatches", "true");
    if (sport == "tennis") localStorage.setItem("tennisMatches", "true");
}
async function displayMatches(sport: string) {
    const data = await FetchCurrentMatches();
    const filteredArray = data.filter(
        (item) => item.sport.toLowerCase() == sport.toLowerCase()
    );
    const matchesContainer = document.getElementById("matches-container");
    matchesContainer!.innerHTML = "";
    filteredArray.forEach((match) => {
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
        }" class="btn btn-outline-primary match">${match.homeOdds}</button>
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
            <button class="btn btn-success w-100 mt-3" type="button">Place Bet</button>
        </div>
    `;
    });

    const matchButtons = document.querySelectorAll<HTMLButtonElement>(".match");

    matchButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target as HTMLButtonElement;
            if (button.classList.contains("btn-primary")) {
                allOdds.splice(allOdds.indexOf(Number(target.innerText)), 1);
                button.classList.remove("btn-primary");
                button.classList.add("btn-outline-primary");
            } else {
                allOdds.push(Number(target.innerText));
                button.classList.remove("btn-outline-primary");
                button.classList.add("btn-primary");
            }
            console.log(allOdds);
        });
    });
}
let allOdds: number[] = [];
const footballBetting = document.getElementById("football-betting");
footballBetting!.addEventListener("click", () => {
    const matches = getRandomMatches(10, "soccer");
    if (localStorage.getItem("soccerMatches") !== "true") {
        sendMatchesToServer(matches, "soccer");
    }
    displayMatches("soccer");
});

const basketballBetting = document.getElementById("basketball-betting");
basketballBetting!.addEventListener("click", () => {
    const matches = getRandomMatches(10, "basketball");
    if (localStorage.getItem("basketballMatches") !== "true") {
        sendMatchesToServer(matches, "basketball");
    }
    displayMatches("basketball");
});

const cricketBetting = document.getElementById("cricket-betting");
cricketBetting!.addEventListener("click", () => {
    const matches = getRandomMatches(10, "cricket");
    if (localStorage.getItem("cricketMatches") !== "true") {
        sendMatchesToServer(matches, "cricket");
    }
    displayMatches("cricket");
});

const americanFootballBetting = document.getElementById(
    "americanFootball-betting"
);
americanFootballBetting!.addEventListener("click", () => {
    const matches = getRandomMatches(10, "american football");
    if (localStorage.getItem("americanFootballMatches") !== "true") {
        sendMatchesToServer(matches, "american football");
    }
    displayMatches("american football");
});

const tennisBetting = document.getElementById("tennis-betting");
tennisBetting!.addEventListener("click", () => {
    const matches = getRandomMatches(10, "tennis");
    if (localStorage.getItem("tennisMatches") !== "true") {
        sendMatchesToServer(matches, "tennis");
    }
    displayMatches("tennis");
});
