"use strict";
class WebShop {
    constructor(initialBalance) {
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
    updateBalanceDisplay() {
        const balanceElement = document.getElementById("userBalance");
        if (balanceElement) {
            balanceElement.innerHTML = this.balance.toString();
        }
    }
    setupEventListeners() {
        document.querySelectorAll(".buy-button").forEach(button => {
            button.addEventListener("click", (event) => {
                var _a, _b;
                const productCard = event.target.closest(".product-card");
                if (productCard) {
                    const productName = ((_b = (_a = productCard.querySelector("h3")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
                    this.buyItem(productName);
                }
            });
        });
    }
    buyItem(item) {
        if (!this.inventory[item]) {
            alert(`Item "${item}" not found in the store.`);
            return;
        }
        const price = this.inventory[item];
        if (this.balance >= price) {
            this.balance -= price;
            this.updateBalanceDisplay();
            alert(`Successfully purchased ${item} for ${price} Ft. Remaining balance: ${this.balance} Ft`);
        }
        else {
            alert(`Insufficient funds to buy ${item}. Your balance is ${this.balance} Ft, but the item costs ${price} Ft.`);
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new WebShop(682357236423423);
});
