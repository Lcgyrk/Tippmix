import { users, FetchBets, Bet } from "./readFile.js";

let bets: Bet[] = [];

const seeDiv = document.querySelector(".seeX");
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const searchButton = document.getElementById("initiateSearch") as HTMLButtonElement;
let whichPressed = "";

const seeUsers = document.getElementById("userControl") as HTMLButtonElement;
seeUsers.addEventListener("click", () => {
    seeDiv!.innerHTML = "";
    whichPressed = "user";
    showUsers();
});

const seeMatches = document.getElementById("matchControl") as HTMLInputElement;
seeMatches.addEventListener("click", () => {
    seeDiv!.innerHTML = "";
    whichPressed = "match";
    showMatches();
});

function showUsers(searchCriteria: string = "") {
    let tableHTML = `
          <table class="table table-striped mt-3 mx-3 table-responsive">
              <tr>
                  <th>Username</th>
                  <th>E-mail</th>
                  <th>Password</th>
                  <th>Reveal password</th>
              </tr>`;

    users.forEach(user => {
        if (searchCriteria == "" || user.name.toLowerCase().includes(searchCriteria.toLowerCase()) || user.email.toLowerCase().includes(searchCriteria.toLowerCase())) {
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
                              Show
                          </button>
                      </td>
                  </tr>`;
        }
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

async function showMatches(searchCritera: string = "") {
    bets = await FetchBets();
    let tableHTML = `
          <table class="table table-striped mt-3 mx-3 table-responsive">
              <tr>
                  <th>Sport</th>
                  <th>Home team</th>
                  <th>Away team</th>
                  <th>Home odds</th>
                  <th>Away odds</th>
                  <th>Draw odds</th>
              </tr>`;

    bets.forEach(bet => {
        if (searchCritera == "" || bet.homeTeam.toLowerCase().includes(searchCritera.toLowerCase()) || 
            bet.awayTeam.toLowerCase().includes(searchCritera.toLowerCase()) || 
            bet.sport.toLowerCase().includes(searchCritera.toLowerCase())) {
            if (bet.drawOdds === null) {
                tableHTML += `
                      <tr>
                          <td>${bet.sport}</td>
                          <td>${bet.homeTeam}</td>
                          <td>${bet.awayTeam}</td>
                          <td>${bet.homeOdds}</td>
                          <td>${bet.awayOdds}</td>
                          <td><span class="text-danger">Nem lehet</span></td>
                      </tr>`;
            } else {
                tableHTML += `
                  <tr>
                      <td>${bet.sport}</td>
                      <td>${bet.homeTeam}</td>
                      <td>${bet.awayTeam}</td>
                      <td>${bet.homeOdds}</td>
                      <td>${bet.awayOdds}</td>
                      <td>${bet.drawOdds}</td>
                  </tr>`;
            }
        }
    });
    
    tableHTML += "</table>";
    seeDiv!.innerHTML = tableHTML;
}

searchButton.addEventListener("click", () => {
    if (searchInput.value == "") {
        searchInput.classList.add("is-invalid");
        alert("Felhasználónévre, sportra vagy csapatra keresés szükséges!");
    }
    else {
        searchInput.classList.remove("is-invalid");
    }
    if (whichPressed == ""){
        alert("Kérem válasszon egy opciót!");
    }
    if (whichPressed == "match") {
        showMatches(searchInput.value);
    };
    if (whichPressed == "user") {
        showUsers(searchInput.value);
    }
});