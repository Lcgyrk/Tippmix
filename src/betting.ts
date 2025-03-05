import { selectedMatches, selectedOdds } from "./main.js";

export function displayBets() {
    let betAmountInput = document.getElementById(
        "bet-amount"
    ) as HTMLInputElement;
    let betAmount = parseFloat(betAmountInput.value);
    let expectedWinningsSpan = document.getElementById("expected-winnings");
    let betUl = document.getElementById("bet-list");
    let totalOddsSpan = document.getElementById("total-odds");
    betUl!.innerHTML = "";
    for (let index = 0; index < selectedMatches.length; index++) {
        const match = selectedMatches[index].split("-")[1];
        const odds = selectedOdds[index];
        betUl!.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${match}
            <span class="badge bg-danger">${odds}</span>
        </li>`;
        if (Number.isNaN(betAmount)) expectedWinningsSpan!.innerHTML = "-";
        else {
            expectedWinningsSpan!.innerHTML = (
                betAmount * selectedOdds.reduce((acc, num) => acc * num, 1)
            ).toFixed(2);
        }
    }
    if (selectedOdds.length >= 1) {
        totalOddsSpan!.innerHTML = `${selectedOdds
            .reduce((acc, num) => acc * num, 1)
            .toFixed(2)}`;
        betAmountInput!.addEventListener("input", () => {
            betAmount = parseFloat(betAmountInput.value);
            expectedWinningsSpan!.innerHTML = (
                betAmount * selectedOdds.reduce((acc, num) => acc * num, 1)
            ).toFixed(2);
            if (betAmountInput.value.length == 0)
                expectedWinningsSpan!.innerHTML = "-";
        });
    } else {
        totalOddsSpan!.innerHTML = "-";
        expectedWinningsSpan!.innerHTML = "-";
    }
}

function simulateMatch(odds: number) {
    const chance = (1 / odds) * 100;
    const result = Math.random() * 100;
    console.log(`esely: ${chance}`);
    console.log(`random eredmeny: ${result}`);
    if (result <= chance) return true;
    else return false;
}

export function placingBet() {
    for (let index = 0; index < selectedOdds.length; index++) {
        const odds = selectedOdds[index];
        const match = selectedMatches[index];
        const result = simulateMatch(odds);
        if (!result) {
            document.getElementById("modalButton")!.click();
            document.querySelector(
                ".modal-body-losing"
            )!.innerHTML = `Vesztettél!\n${match.split("-")[1]} veszített!`;
        }
    }
}
