// import { User } from "./readFile";
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    credits: number;
}
class WebShop {
    private balance: number;
    private inventory: { [key: string]: { price: number; image: string } };
    private user: User;

    constructor(user: User) {
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

    private displayInventory(): void {
        const shopContainer = document.querySelector(
            ".product-grid"
        ) as HTMLElement;
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
                buyButton?.addEventListener("click", () => {
                    this.buyItem(itemName);
                });

                shopContainer.appendChild(productCard);
            }
        }
    }
    private updateBalanceDisplay(): void {
        const balanceElement = document.getElementById("userCredits");
        if (balanceElement) {
            this.user.credits = this.balance;
            balanceElement.innerHTML = this.balance.toString();
            localStorage.setItem("currentUser", JSON.stringify(this.user));
        }
    }

    public buyItem(item: string): void {
        if (!this.inventory[item]) {
            alert(`Ez a tétel "${item}" nem található meg a webshopba.`);
            return;
        }

        const price = this.inventory[item].price;

        if (this.balance >= price) {
            this.balance -= price;
            this.updateBalanceDisplay();
            alert(
                `${item} sikeresen megvéve ${price} Ft. frissített egyenleg: ${this.balance} Ft`
            );
        } else {
            alert(
                `Nem megfelelő egyenleg a ${item} megvásárlására. Az egyenlege ${this.balance} Ft, de ez a tétel ${price} Ft.`
            );
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const currentUserData = localStorage.getItem("currentUser");
    console.log(currentUserData);

    if (currentUserData) {
        const user = JSON.parse(currentUserData) as User;
        new WebShop(user);
    }
});
