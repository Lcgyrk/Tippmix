import { users, FetchBets, Bet } from "./readFile.js";

let bets: Bet[] = [];

const seeDiv = document.querySelector(".seeX");

const seeUsers = document.getElementById("userControl") as HTMLButtonElement;
seeUsers.addEventListener("click", () => {
    seeDiv!.innerHTML = "";
    showUsers();
});

const seeMatches = document.getElementById("matchControl") as HTMLInputElement;
seeMatches.addEventListener("click", () => {
    seeDiv!.innerHTML = "";
});

function showUsers() {
    let tableHTML = `
        <table class="table table-striped mt-3">
            <tr>
                <th>Felhasználónév</th>
                <th>E-mail</th>
                <th>Jelszó</th>
                <th>Jelszó megjelenítés</th>
            </tr>`;

    users.forEach(user => {
        const visibleID = `visible_${user.id}`;
        const hiddenId = `hidden_${user.id}`;
        
        tableHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <span id="${visibleID}" style="display: none">${user.password}</span>
                    <span id="${hiddenId}">********</span>
                </td>
                <td>
                    <button class="btn btn-warning" id="btn_${user.id}">
                        Megjelenít
                    </button>
                </td>
            </tr>`;
    });

    tableHTML += "</table>";
    seeDiv!.innerHTML = tableHTML;

    users.forEach(user => {
        const button = document.getElementById(`btn_${user.id}`);
        button?.addEventListener('click', () => togglePassword(user.id));
    });
}

function togglePassword(userId: number) {
    const visibleElement = document.getElementById(`visible_${userId}`);
    const hiddenElement = document.getElementById(`hidden_${userId}`);
    
    if (visibleElement && hiddenElement) {
        visibleElement.style.display = visibleElement.style.display === 'none' ? 'inline' : 'none';
        hiddenElement.style.display = hiddenElement.style.display === 'none' ? 'inline' : 'none';
    }
}

async function showMatches(){
    bets = await FetchBets();
    let tableHTML = `
        <table class="table table-striped mt-3">
            <tr>
                <th>Sport</th>
                <th>Hazaiak</th>
                <th>Vendégek</th>
                <th>Hazai esélye</th>
                <th>Vendég esélye</th>
                <th>Döntetlen esélye</th>
            </tr>`;
    tableHTML += "</table>";
}
