import { selectedMatches, selectedOdds } from "./main.js";
import { users, currentUser } from "./main.js";

//localStorage.clear();

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
    const balance = document.getElementById("balance");
    let betAmountInput = document.getElementById(
        "bet-amount"
    ) as HTMLInputElement;
    let betAmount = parseFloat(betAmountInput.value);

    if (betAmount <= currentUser.credits) {
        // Deduct bet amount from user's credits
        currentUser.credits -= betAmount;

        // Simulate matches
        let win = true;
        for (let index = 0; index < selectedOdds.length; index++) {
            const odds = selectedOdds[index];
            const match = selectedMatches[index];
            const result = simulateMatch(odds);

            if (!result) {
                win = false;
                const prize =
                    betAmount * selectedOdds.reduce((acc, num) => acc * num, 1);

                // Handle loss
                const newBet = {
                    result: "Loss",
                    betAmount: betAmount,
                    winAmount: prize,
                    profit: 0 - betAmount,
                };
                currentUser.history.totalBets += 1;
                currentUser.history.profit -= betAmount;
                currentUser.history.betHistory.push(newBet);

                // Update the user in users array (only once)
                const userIndex = users.findIndex(
                    (user) =>
                        user.name === currentUser.name &&
                        user.password === currentUser.password
                );

                if (userIndex !== -1) {
                    // Copy all updated properties from currentUser to the user in the array
                    users[userIndex].credits = currentUser.credits;
                    users[userIndex].history = { ...currentUser.history };
                }

                // Update localStorage
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(currentUser)
                );
                localStorage.setItem("Users", JSON.stringify(users));

                // Update UI
                balance!.innerHTML = `${currentUser.credits}`;

                // Show losing modal
                document.getElementById("modalButton")!.click();
                if (match.split("-")[1] == "draw") {
                    document.querySelector(
                        ".modal-body-losing"
                    )!.innerHTML = `Vesztettél!\nNem lett döntetlen!`;
                } else {
                    document.querySelector(
                        ".modal-body-losing"
                    )!.innerHTML = `Vesztettél!\n${
                        match.split("-")[1]
                    } veszített!`;
                }

                return; // Exit the function once a loss is found
            }
        }

        if (win) {
            // Calculate prize
            const prize =
                betAmount * selectedOdds.reduce((acc, num) => acc * num, 1);

            const newBet = {
                result: "Win",
                betAmount: betAmount,
                winAmount: prize,
                profit: prize - betAmount,
            };

            // Update currentUser for win
            currentUser.history.totalBets += 1;
            currentUser.history.profit += prize - betAmount; // Net profit
            currentUser.credits += prize;
            currentUser.history.betHistory.push(newBet);

            // Update user in users array (only once)
            const userIndex = users.findIndex(
                (user) =>
                    user.name === currentUser.name &&
                    user.password === currentUser.password
            );

            if (userIndex !== -1) {
                // Copy all updated properties from currentUser to the user in the array
                users[userIndex].credits = currentUser.credits;
                users[userIndex].history = { ...currentUser.history };
            }

            // Update localStorage
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            localStorage.setItem("Users", JSON.stringify(users));

            // Update UI
            balance!.innerHTML = `${currentUser.credits}`;

            // Show winning modal
            document.getElementById("modalButton")!.click();
            document.querySelector(
                ".modal-body-losing"
            )!.innerHTML = `Nyertél!\nNyert összeg: ${prize}`;
        }
    }
}
