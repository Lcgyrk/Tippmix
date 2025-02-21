import { User } from "./readFile";

class WebShop {
    private balance: number;
    private inventory: { [key: string]: number };
    private user: User;

    constructor(user: User) {
        this.user = user;
        this.balance = user.credits;
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
        const balanceElement = document.getElementById("userCredits");
        if (balanceElement) {
            this.user.credits = this.balance;
            balanceElement.innerHTML = this.balance.toString();
            // Save updated user data
            localStorage.setItem('currentUser', JSON.stringify(this.user));
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
            alert(`Ez a tétel "${item}" nem található meg a webshopba.`);
            return;
        }

        const price = this.inventory[item];

        if (this.balance >= price) {
            this.balance -= price;
            this.updateBalanceDisplay();
            alert(`${item} sikeresen megvéve ${price} Ft. frissített egyenleg: ${this.balance} Ft`);
        } else {
            alert(`Nem megfelelő egyenleg a ${item} megvásárlására. Az egyenlege ${this.balance} Ft, de ez a tétel ${price} Ft.`);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
        const user = JSON.parse(currentUserData) as User;
        new WebShop(user);
    }
});

export { WebShop };