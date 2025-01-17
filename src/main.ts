interface Bet {
    id: number;
    sport: string;
    homeTeam: string;
    awayTeam: string;
    homeOdds: number;
    awayOdds: number;
    drawOdds: number;
}

interface BetSelection {
    bet: Bet;
    type: 'home' | 'draw' | 'away';
    odds: number;
}

class BettingUI {
    private readonly matchesContainer: HTMLElement;
    private readonly selectedBetsContainer: HTMLElement;
    private readonly stakeInput: HTMLInputElement;
    private readonly potentialWinElement: HTMLElement;
    private selectedBets: Map<number, BetSelection> = new Map();

    constructor() {
        this.matchesContainer = document.getElementById('matches-container') as HTMLElement;
        this.selectedBetsContainer = document.getElementById('selected-bets') as HTMLElement;
        this.stakeInput = document.querySelector('input[type="number"]') as HTMLInputElement;
        this.potentialWinElement = document.getElementById('potential-win') as HTMLElement;
        
        if (!this.validateElements()) {
            throw new Error('Required DOM elements not found');
        }

        this.initializeUI();
    }

    private validateElements(): boolean {
        return !!(this.matchesContainer && 
                 this.selectedBetsContainer && 
                 this.stakeInput && 
                 this.potentialWinElement);
    }

    private initializeUI(): void {
        this.setupEventListeners();
        this.loadBets();
    }

    private async loadBets(): Promise<void> {
        try {
            const response = await fetch('/api/bets');
            const bets: Bet[] = await response.json();
            this.renderMatches(bets);
        } catch (error) {
            console.error('Failed to load bets:', error);
        }
    }

    private renderMatches(bets: Bet[]): void {
        this.matchesContainer.innerHTML = '';
        bets.forEach(bet => {
            const matchElement = this.createMatchElement(bet);
            this.matchesContainer.appendChild(matchElement);
        });
    }

    private createMatchElement(bet: Bet): HTMLElement {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match-row border-bottom p-3';
        
        const odds = {
            home: this.formatOdds(bet.homeOdds),
            draw: this.formatOdds(bet.drawOdds),
            away: this.formatOdds(bet.awayOdds)
        };
        
        matchDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div class="teams">
                    <h6>
                        <span class="sport-type badge bg-info me-2">${this.escapeHtml(bet.sport)}</span>
                        <span class="team-names">${this.escapeHtml(bet.homeTeam)} vs ${this.escapeHtml(bet.awayTeam)}</span>
                    </h6>
                </div>
                <div class="odds d-flex gap-2">
                    <button class="btn btn-outline-primary home-odds" data-bet-id="${bet.id}" data-type="home">${odds.home}</button>
                    <button class="btn btn-outline-primary draw-odds" data-bet-id="${bet.id}" data-type="draw">${odds.draw}</button>
                    <button class="btn btn-outline-primary away-odds" data-bet-id="${bet.id}" data-type="away">${odds.away}</button>
                </div>
            </div>
        `;

        return matchDiv;
    }

    private setupEventListeners(): void {
        this.matchesContainer.addEventListener('click', this.handleBetClick.bind(this));
        this.stakeInput.addEventListener('input', this.handleStakeChange.bind(this));
    }

    private handleBetClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.matches('button[data-bet-id]')) return;

        const betId = Number(target.dataset.betId);
        const betType = target.dataset.type as 'home' | 'draw' | 'away';
        
        this.toggleBetSelection(betId, betType, target);
    }

    private toggleBetSelection(betId: number, type: 'home' | 'draw' | 'away', button: HTMLElement): void {
        if (this.selectedBets.has(betId)) {
            this.selectedBets.delete(betId);
            button.classList.remove('active');
        } else {
            // Add new selection
            const bet = this.getBetById(betId);
            if (bet) {
                const odds = type === 'home' ? bet.homeOdds : type === 'draw' ? bet.drawOdds : bet.awayOdds;
                this.selectedBets.set(betId, { bet, type, odds });
                button.classList.add('active');
            }
        }

        this.updateBettingSlip();
    }

    private getBetById(id: number): Bet | undefined {
        // Implementation depends on how you store/access bets
        return undefined; // Replace with actual implementation
    }

    private updateBettingSlip(): void {
        this.selectedBetsContainer.innerHTML = '';
        this.selectedBets.forEach(selection => {
            const betElement = this.createBetSlipElement(selection);
            this.selectedBetsContainer.appendChild(betElement);
        });

        this.calculatePotentialWin();
    }

    private createBetSlipElement(selection: BetSelection): HTMLElement {
        const div = document.createElement('div');
        div.className = 'selected-bet p-2 border-bottom';
        div.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>${this.escapeHtml(selection.bet.homeTeam)} vs ${this.escapeHtml(selection.bet.awayTeam)}</div>
                <div>${this.formatOdds(selection.odds)}</div>
            </div>
            <div class="small text-muted">${selection.type.toUpperCase()}</div>
        `;
        return div;
    }

    private calculatePotentialWin(): void {
        const stake = Number(this.stakeInput.value) || 0;
        let totalOdds = 1;
        
        this.selectedBets.forEach(selection => {
            totalOdds *= selection.odds;
        });

        const potentialWin = stake * totalOdds;
        this.potentialWinElement.textContent = this.formatCurrency(potentialWin);
    }

    private handleStakeChange(): void {
        this.calculatePotentialWin();
    }

    private formatOdds(odds: number): string {
        return odds.toFixed(2);
    }

    private formatCurrency(amount: number): string {
        return `${amount.toFixed(2)}`;
    }

    private escapeHtml(str: string): string {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// Initialize the betting UI when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BettingUI();
});