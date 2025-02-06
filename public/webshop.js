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
            console.log(this.balance);
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
            alert(`Ez a tétel "${item}" nem található meg a webshopba.`);
            return;
        }
        const price = this.inventory[item];
        if (this.balance >= price) {
            this.balance -= price;
            this.updateBalanceDisplay();
            alert(`${item} sikeresen megvéve ${price} Ft. frissített egyenleg: ${this.balance} Ft`);
        }
        else {
            alert(`Nem megfelelő egyenleg a ${item} megvásárlására. Az egyenlege ${this.balance} Ft, de ez a tétel ${price} Ft.`);
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new WebShop(682357236423423);
});
//ez majd a main.ts-be megy
document.addEventListener("DOMContentLoaded", () => {
    const stakeInput = document.getElementById("stake1");
    const placeBetButton = document.querySelector(".btn-success");
    placeBetButton.addEventListener("click", () => {
        const stakeValue = parseFloat(stakeInput.value);
        if (isNaN(stakeValue) || stakeValue <= 0) {
            alert("Helyes összeget írjon be legyenszíves.");
            return;
        }
        const betConfirmed = confirm(` Feltenni kívánt összeg: ${stakeValue}FT. Biztos felteszi?`);
        if (betConfirmed) {
            alert("Fogadás sikeresen megtéve!");
            stakeInput.value = "";
        }
        const WinOrLose = Math.random();
        let DidWin = false;
        if (WinOrLose >= 0 && WinOrLose <= 0.4) {
            DidWin = true;
        }
        else if (WinOrLose >= 0.4 && WinOrLose <= 0.8) {
            DidWin = false;
        }
        else {
            DidWin = null; //döntetlen
        }
    });
});
