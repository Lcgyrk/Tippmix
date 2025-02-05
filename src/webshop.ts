class WebShop {
    private balance: number;
    private inventory: { [key: string]: number };

    constructor(initialBalance: number) {
        this.balance = initialBalance;
        this.inventory = {
            "Gaming Console": 150000,
            "Smartphone": 200000,
            "Smart TV": 300000,
            "Fólia": 1500
        };
        this.updateBalanceDisplay();
        this.setupEventListeners();
    }

    private updateBalanceDisplay(): void {
        const balanceElement = document.getElementById("userBalance");
        if (balanceElement) {
            balanceElement.innerHTML = this.balance.toString();
        }
    }

    private setupEventListeners(): void {
        document.querySelectorAll(".buy-button").forEach(button => {
            button.addEventListener("click", (event) => {
                const productCard = (event.target as HTMLElement).closest(".product-card");
                if (productCard) {
                    const productName = productCard.querySelector("h3")?.textContent?.trim() || "";
                    this.buyItem(productName);
                }
            });
        });
    }

    public buyItem(item: string): void {
        if (!this.inventory[item]) {
            alert(`Item "${item}" not found in the store.`);
            return;
        }

        const price = this.inventory[item];

        if (this.balance >= price) {
            this.balance -= price;
            this.updateBalanceDisplay();
            alert(`Successfully purchased ${item} for ${price} Ft. Remaining balance: ${this.balance} Ft`);
        } else {
            alert(`Insufficient funds to buy ${item}. Your balance is ${this.balance} Ft, but the item costs ${price} Ft.`);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new WebShop(682357236423423);
});
