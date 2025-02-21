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

export function handleBetPlacement() {
    const betAmount = parseFloat((document.getElementById("bet-amount") as HTMLInputElement).value);
    const userBalanceElement = document.getElementById("balance");
    
    if (selectedMatches.length === 0) {
        alert("Select at least one match to place a bet!");
        return;
    }

    if (!betAmount || betAmount <= 0) {
        alert("Please enter a valid bet amount!");
        return;
    }

    const currentBalance = parseInt(userBalanceElement?.innerHTML || "0");
    
    if (betAmount > currentBalance) {
        alert("Insufficient balance to place this bet!");
        return;
    }

    const betPerMatch = betAmount / selectedMatches.length;
    const newBalance = currentBalance - betAmount;
    
    if (userBalanceElement) {
        userBalanceElement.innerHTML = newBalance.toString();
    }

    alert("Bets placed! Matches are in progress...");
    
    setTimeout(() => {
        let totalWinnings = 0;
        let results: string[] = [];

        selectedMatches.forEach((match, index) => {
            const matchParts = match.split("-");
            const matchId = matchParts[0];
            const matchName = matchParts[1];
    // Update this section in handleBetPlacement function
    const homeButton = document.querySelector(`#${matchId}-home`);
    const drawButton = document.querySelector(`#${matchId}-draw`);
    const awayButton = document.querySelector(`#${matchId}-away`);

    let selectedBet = "";

    if (homeButton?.classList.contains('btn-outline-success')) {
        selectedBet = "Home";
    } else if (drawButton?.classList.contains('btn-outline-success')) {
        selectedBet = "Draw";
    } else if (awayButton?.classList.contains('btn-outline-success')) {
        selectedBet = "Away";
    }
            const matchOdds = selectedOdds[index];
            
            // Generate match result
            const randomNumber = Math.random();
            let matchOutcome;
            
            if (randomNumber < 0.4) {
                matchOutcome = "Home";
            } else if (randomNumber < 0.7) {
                matchOutcome = "Draw";
            } else {
                matchOutcome = "Away";
            }
            
            const won = selectedBet === matchOutcome;

            if (won) {
                const matchWinnings = betPerMatch * matchOdds;
                totalWinnings += matchWinnings;
                results.push(`${matchName}: ${matchOutcome} - WON (${matchWinnings.toFixed(2)})`);
            } else {
                results.push(`${matchName}: ${matchOutcome} - LOST (You bet: ${selectedBet})`);
            }
        });

        alert(`Match Results:\n${results.join('\n')}`);

        if (totalWinnings > 0) {
            const finalBalance = parseInt(userBalanceElement?.innerHTML || "0") + totalWinnings;
            if (userBalanceElement) {
                userBalanceElement.innerHTML = finalBalance.toString();
            }
            alert(`Total Winnings: ${totalWinnings.toFixed(2)}`);
        }

        selectedMatches.length = 0;
        selectedOdds.length = 0;
        (document.getElementById("bet-amount") as HTMLInputElement).value = "";
        displayBets();

    }, 2000);
}