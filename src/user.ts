function updateBettingStats() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const bettingHistory = JSON.parse(localStorage.getItem("bettingHistory") || "[]");
    
    // Filter betting history for current user
    const userBets = bettingHistory.filter((bet: any) => bet.userEmail === currentUser.email);
    
    // Calculate total bets
    const totalBetsElement = document.getElementById("totalBets");
    if (totalBetsElement) {
        totalBetsElement.textContent = userBets.length.toString();
    }
    
    // Calculate profit/loss
    const profitLossElement = document.getElementById("profitLoss");
    if (profitLossElement) {
        const totalProfit = userBets.reduce((acc: number, bet: any) => acc + bet.profit, 0);
        profitLossElement.textContent = totalProfit >= 0 ? `+${totalProfit}` : totalProfit.toString();
        profitLossElement.className = totalProfit >= 0 ? 'text-success' : 'text-danger';
    }
    
    // Update betting history list
    const historyList = document.getElementById("bettingHistory");
    if (historyList) {
        historyList.innerHTML = userBets.map((bet: any) => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${bet.matchName}
                <span class="badge ${bet.profit >= 0 ? 'bg-success' : 'bg-danger'}">${bet.profit}</span>
            </li>
        `).join('');
    }
}


    const addBalanceBtn = document.getElementById("addBalanceBtn") as HTMLButtonElement;
    const addBalanceInput = document.getElementById("addBalanceInput") as HTMLInputElement;
    
    addBalanceBtn?.addEventListener("click", () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        const users = JSON.parse(localStorage.getItem("Users") || "[]");
        
        const amount = Number(addBalanceInput.value) || 1000;
        currentUser.credits += amount;
        
        // Update the user in the users array
        const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
        users[userIndex] = currentUser;
        
        // Save back to localStorage
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("Users", JSON.stringify(users));
        
        // Update display
        const balanceDisplay = document.getElementById("userCredits");
        const profileBalance = document.getElementById("profileBalance");
        
        if (balanceDisplay) balanceDisplay.innerHTML = currentUser.credits.toString();
        if (profileBalance) profileBalance.innerHTML = `${currentUser.credits} credits`;
        
        // Clear input
        addBalanceInput.value = "";
    });


document.addEventListener("DOMContentLoaded", () => {
    updateBettingStats();
});