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
class TippmixApp {
    constructor() {
        this.userCredits = 1000;
        this.cart = [];
        this.selectedBets = new Map();
        this.bettingSection = document.getElementById('bettingSection');
        this.shopSection = document.getElementById('shopSection');
        this.initializeApp();
    }
    initializeApp() {
        this.setupNavigation();
        this.loadBettingData();
        this.loadShopItems();
        this.setupEventListeners();
        this.updateCreditsDisplay();
    }
    setupNavigation() {
        var _a, _b;
        (_a = document.getElementById('bettingTab')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.showSection('betting'));
        (_b = document.getElementById('shopTab')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.showSection('shop'));
    }
    showSection(section) {
        this.bettingSection.classList.toggle('d-none', section !== 'betting');
        this.shopSection.classList.toggle('d-none', section !== 'shop');
    }
    loadBettingData() {
        return __awaiter(this, void 0, void 0, function* () {
            const mockBets = [
                {
                    id: 1,
                    sport: "Football",
                    homeTeam: "Manchester United",
                    awayTeam: "Liverpool",
                    homeOdds: 2.1,
                    drawOdds: 3.4,
                    awayOdds: 3.2
                },
                // Add more mock bets
            ];
            this.renderBets(mockBets);
        });
    }
    loadShopItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const mockItems = [
                {
                    id: 1,
                    name: "Premium Betting Tips",
                    price: 50,
                    description: "Get exclusive betting tips from experts",
                    image: "tips.jpg"
                },
                // Add more mock items
            ];
            this.renderShopItems(mockItems);
        });
    }
    renderBets(bets) {
        const container = document.getElementById('matches-container');
        if (!container)
            return;
        container.innerHTML = bets.map(bet => `
            <div class="match-row border-bottom p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="teams">
                        <h6>
                            <span class="sport-type badge bg-info me-2">${bet.sport}</span>
                            <span>${bet.homeTeam} vs ${bet.awayTeam}</span>
                        </h6>
                    </div>
                    <div class="odds d-flex gap-2">
                        <button class="btn btn-outline-primary" data-bet-id="${bet.id}" data-type="home">${bet.homeOdds}</button>
                        <button class="btn btn-outline-primary" data-bet-id="${bet.id}" data-type="draw">${bet.drawOdds}</button>
                        <button class="btn btn-outline-primary" data-bet-id="${bet.id}" data-type="away">${bet.awayOdds}</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    renderShopItems(items) {
        const container = document.getElementById('shopItemsContainer');
        if (!container)
            return;
        container.innerHTML = items.map(item => `
            <div class="col">
                <div class="card h-100">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="card-text"><strong>Price: ${item.price}</strong></p>
                        <button class="btn btn-primary" data-item-id="${item.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    setupEventListeners() {
        var _a, _b, _c;
        // Betting events
        (_a = document.getElementById('matches-container')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('button[data-bet-id]')) {
                this.handleBetSelection(target);
            }
        });
        // Shop events
        (_b = document.getElementById('shopItemsContainer')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('button[data-item-id]')) {
                this.handleAddToCart(target);
            }
        });
        // Checkout event
        (_c = document.getElementById('checkoutButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => this.handleCheckout());
    }
    handleBetSelection(button) {
        const betId = Number(button.dataset.betId);
        const betType = button.dataset.type;
        // Implement bet selection logic
    }
    handleAddToCart(button) {
        const itemId = Number(button.dataset.itemId);
        // Implement add to cart logic
    }
    handleCheckout() {
        // Implement checkout logic
    }
    updateCreditsDisplay() {
        const creditsElement = document.getElementById('userCredits');
        if (creditsElement) {
            creditsElement.textContent = this.userCredits.toString();
        }
    }
}
// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new TippmixApp();
});
export {};
