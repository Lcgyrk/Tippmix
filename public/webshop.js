"use strict";
class WebShop {
    constructor(user) {
        this.user = user;
        this.balance = user.credits;
        this.inventory = {
            Konzol: { price: 150000, image: "images/szutyokconsole.jpg" },
            Kompúter: { price: 200000, image: "images/puposmocsok.png" },
            Televízor: { price: 300000, image: "images/undirítómocsok.jpg" },
            Fólia: {
                price: 1500,
                image: "images/haztartasi-folia-45-cm-x-300-m.jpg",
            },
            Gyufa: { price: 5000, image: "images/gyufa.png" },
            Klaviatúra: { price: 65000, image: "images/hardverapró.png" },
            Ülőalkalmatosság: { price: 120000, image: "images/büdösszék.png" },
        };
        console.log(user);
        this.updateBalanceDisplay();
        this.displayInventory();
    }
    displayInventory() {
        const shopContainer = document.querySelector(".product-grid");
        if (shopContainer) {
            shopContainer.innerHTML = "";
            for (const itemName in this.inventory) {
                const itemData = this.inventory[itemName];
                const productCard = document.createElement("div");
                console.log(itemData.image);
                productCard.className = "product-card";
                productCard.innerHTML = `
                    <img src="${itemData.image}" alt="${itemName}">
                    <h3>${itemName}</h3>
                    <p>${itemData.price} Ft</p>
                    <button class="buy-button">Vásárlás</button>
                `;
                const buyButton = productCard.querySelector(".buy-button");
                buyButton === null || buyButton === void 0 ? void 0 : buyButton.addEventListener("click", () => {
                    this.buyItem(itemName);
                });
                shopContainer.appendChild(productCard);
            }
        }
    }
    updateBalanceDisplay() {
        const balanceElement = document.getElementById("userCredits");
        if (balanceElement) {
            this.user.credits = this.balance;
            balanceElement.innerHTML = this.balance.toString();
            localStorage.setItem("currentUser", JSON.stringify(this.user));
        }
    }
    buyItem(item) {
        if (!this.inventory[item]) {
            alert(`Ez a tétel "${item}" nem található meg a webshopba.`);
            return;
        }
        const price = this.inventory[item].price;
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
    const currentUserData = localStorage.getItem("currentUser");
    console.log(currentUserData);
    if (currentUserData) {
        const user = JSON.parse(currentUserData);
        new WebShop(user);
    }
});
