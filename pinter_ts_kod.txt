function initializeMatchDisplay(): void {
    let matches: Bet[] = [];
    let userCredits = 100; // Starting credits

    async function fetchMatches() {
        const response = await fetch('http://localhost:3000/bets');
        matches = await response.json();
    }

    function placeBet(matchId: number, betType: 'home' | 'draw' | 'away', amount: number, odds: number): void {
        if (amount > userCredits) {
            alert('Not enough credits!');
            return;
        }

        userCredits -= amount;
        updateCreditsDisplay();

        const result = Math.floor(Math.random() * 3) + 1;
        const betResult = {
            1: 'home',
            2: 'draw',
            3: 'away'
        }[result];

        setTimeout(() => {
            if (betType === betResult) {
                const winnings = amount * odds;
                userCredits += winnings;
                alert(`You won! Earnings: ${winnings} credits`);
            } else {
                alert('Better luck next time!');
            }
            updateCreditsDisplay();
        }, 1000);
    }

    function updateCreditsDisplay(): void {
        const creditsElement = document.querySelector('.user-credits');
        if (creditsElement) {
            creditsElement.textContent = `Credits: ${userCredits}`;
        }
    }

    function renderMatch(match: Bet): void {
        const container = document.querySelector('.matches-container');
        const matchElement = document.createElement('div');
        matchElement.className = 'match-card';
        
        const betInput = document.createElement('input');
        betInput.type = 'number';
        betInput.className = 'bet-amount';
        betInput.placeholder = 'Bet amount';

        matchElement.innerHTML = `
            <div class="match-header">
                <span class="match-id">#${match.id}</span>
            </div>
            <div class="teams">
                <span class="home-team">${match.homeTeam}</span>
                <span class="vs">vs</span>
                <span class="away-team">${match.awayTeam}</span>
            </div>
            <div class="odds">
                <button class="odd-btn home" data-odd="${match.homeOdds}">
                    ${match.homeOdds}
                </button>
                <button class="odd-btn draw" data-odd="${match.drawOdds}">
                    ${match.drawOdds}
                </button>
                <button class="odd-btn away" data-odd="${match.awayOdds}">
                    ${match.awayOdds}
                </button>
            </div>
        `;

        matchElement.appendChild(betInput);

        const buttons = matchElement.querySelectorAll('.odd-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const amount = parseInt(betInput.value);
                const odds = parseFloat(button.getAttribute('data-odd') || '0');
                const betType = button.classList.contains('home') ? 'home' : 
                               button.classList.contains('draw') ? 'draw' : 'away';
                
                placeBet(match.id, betType, amount, odds);
            });
        });

        container?.appendChild(matchElement);
    }

    function initializeDisplay(): void {
        const container = document.createElement('div');
        container.className = 'matches-container';
        
        const creditsDisplay = document.createElement('div');
        creditsDisplay.className = 'user-credits';
        creditsDisplay.textContent = `Credits: ${userCredits}`;
        
        document.body.appendChild(creditsDisplay);
        document.body.appendChild(container);
    }

    function loadMatches(): void {
        matches.forEach(match => renderMatch(match));
    }

    async function init() {
        await fetchMatches();
        initializeDisplay();
        loadMatches();
    }

    init();
}

initializeMatchDisplay();