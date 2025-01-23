import { Bet } from "readFile.js";

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
interface Bet {
    id: number;
    sport: string;
    homeTeam: string;
    awayTeam: string;
    homeOdds: number;
    drawOdds: number;
    awayOdds: number;
}

interface ShopItem {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

interface CartItem extends ShopItem {
    quantity: number;
}

class TippmixApp {
    private bettingSection: HTMLElement;
    private shopSection: HTMLElement;
    private userCredits: number = 1000;
    private cart: CartItem[] = [];
    private selectedBets: Map<number, Bet> = new Map();

    constructor() {
        this.bettingSection = document.getElementById('bettingSection') as HTMLElement;
        this.shopSection = document.getElementById('shopSection') as HTMLElement;
        this.initializeApp();
    }

    private initializeApp(): void {
        this.setupNavigation();
        this.loadBettingData();
        this.loadShopItems();
        this.setupEventListeners();
        this.updateCreditsDisplay();
    }

    private setupNavigation(): void {
        document.getElementById('bettingTab')?.addEventListener('click', () => this.showSection('betting'));
        document.getElementById('shopTab')?.addEventListener('click', () => this.showSection('shop'));
    }

    private showSection(section: 'betting' | 'shop'): void {
        this.bettingSection.classList.toggle('d-none', section !== 'betting');
        this.shopSection.classList.toggle('d-none', section !== 'shop');
    }

    private async loadBettingData(): Promise<void> {
        const mockBets: Bet[] = [
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
    }

    private async loadShopItems(): Promise<void> {
        const mockItems: ShopItem[] = [
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
    }

    private renderBets(bets: Bet[]): void {
        const container = document.getElementById('matches-container');
        if (!container) return;

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

    private renderShopItems(items: ShopItem[]): void {
        const container = document.getElementById('shopItemsContainer');
        if (!container) return;

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

    private setupEventListeners(): void {
        // Betting events
        document.getElementById('matches-container')?.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.matches('button[data-bet-id]')) {
                this.handleBetSelection(target);
            }
        });

        // Shop events
        document.getElementById('shopItemsContainer')?.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.matches('button[data-item-id]')) {
                this.handleAddToCart(target);
            }
        });

        // Checkout event
        document.getElementById('checkoutButton')?.addEventListener('click', () => this.handleCheckout());
    }

    private handleBetSelection(button: HTMLElement): void {
        const betId = Number(button.dataset.betId);
        const betType = button.dataset.type;
        // Implement bet selection logic
    }

    private handleAddToCart(button: HTMLElement): void {
        const itemId = Number(button.dataset.itemId);
        // Implement add to cart logic
    }

    private handleCheckout(): void {
        // Implement checkout logic
    }

    private updateCreditsDisplay(): void {
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