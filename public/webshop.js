"use strict";
// import { User } from "./readFile";
class WebShop {
    constructor(user) {
        this.currentFilter = 'all'; // Track current filter
        this.cart = [];
        this.user = user;
        this.balance = user.credits;
        this.inventory = {
            Konzol: {
                price: 150000,
                image: "images/szutyokconsole.jpg",
                category: "electronics"
            },
            Kompúter: {
                price: 200000,
                image: "images/puposmocsok.png",
                category: "electronics"
            },
            Televízor: {
                price: 300000,
                image: "images/undirítómocsok.jpg",
                category: "electronics"
            },
            Fólia: {
                price: 1500,
                image: "images/haztartasi-folia-45-cm-x-300-m.jpg",
                category: "accessories"
            },
            Gyufa: {
                price: 5000,
                image: "images/gyufa.png",
                category: "accessories"
            },
            Klaviatúra: {
                price: 65000,
                image: "images/hardverapró.png",
                category: "electronics"
            },
            Ülőalkalmatosság: {
                price: 120000,
                image: "images/büdösszék.png",
                category: "furniture"
            },
        };
        console.log(user);
        this.updateBalanceDisplay();
        this.displayInventory();
        this.setupCategoryFilters();
        this.setupCart();
    }
    displayInventory() {
        const shopContainer = document.querySelector(".product-grid");
        if (shopContainer) {
            shopContainer.innerHTML = "";
            for (const itemName in this.inventory) {
                const itemData = this.inventory[itemName];
                // Skip items that don't match the current filter
                if (this.currentFilter !== 'all' && itemData.category !== this.currentFilter) {
                    continue;
                }
                const productCard = document.createElement("div");
                console.log(itemData.image);
                productCard.className = "product-card";
                productCard.dataset.category = itemData.category; // Add category as data attribute
                productCard.innerHTML = `
                    <img src="${itemData.image}" alt="${itemName}">
                    <h3>${itemName}</h3>
                    <p class="price-tag">${itemData.price} Ft</p>
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
    addToCart(itemName, price) {
        this.cart.push({ itemName, price });
        this.updateCartDisplay();
        alert(`${itemName} hozzáadva a kosárhoz!`);
    }
    updateCartDisplay() {
        const cartItemsContainer = document.getElementById("cartItems");
        const cartCountBadge = document.getElementById("cartCount");
        cartItemsContainer.innerHTML = ""; // Clear previous items
        let total = 0;
        this.cart.forEach((item, index) => {
            total += item.price;
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <p>${item.itemName} - ${item.price} Ft 
                    <button class="remove-item btn btn-sm btn-danger" data-index="${index}">Törlés</button>
                </p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        cartItemsContainer.innerHTML += `<hr><p><strong>Összesen: ${total} Ft</strong></p>`;
        cartCountBadge.textContent = this.cart.length.toString();
        // Add event listeners to remove buttons
        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const target = e.target;
                const index = parseInt(target.dataset.index || "0");
                this.removeFromCart(index);
            });
        });
    }
    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.updateCartDisplay();
    }
    checkout() {
        // Calculate total
        let total = 0;
        this.cart.forEach(item => {
            total += item.price;
        });
        // Update balance
        this.balance -= total;
        this.updateBalanceDisplay();
        // Update the user in the global users array
        let users = JSON.parse(localStorage.getItem("Users") || "[]");
        const userIndex = users.findIndex((u) => u.id === this.user.id);
        if (userIndex !== -1) {
            users[userIndex].credits = this.balance;
            localStorage.setItem("Users", JSON.stringify(users));
        }
        // Clear cart
        this.cart = [];
        this.updateCartDisplay();
        // Close modal
        const cartModal = bootstrap.Modal.getInstance(document.getElementById("cartModal"));
        cartModal === null || cartModal === void 0 ? void 0 : cartModal.hide();
        alert(`Sikeres vásárlás! Összesen: ${total} Ft`);
    }
    setupCart() {
        const cartButton = document.getElementById("cartButton");
        const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
        if (cartButton) {
            cartButton.addEventListener("click", (e) => {
                e.preventDefault();
                cartModal.show(); // Manually show the modal
            });
        }
        const checkoutBtn = document.getElementById("checkoutBtn");
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", () => this.checkout());
        }
    }
    setupCategoryFilters() {
        const filterButtons = document.querySelectorAll('.category-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.currentTarget; // Ensure event target is an HTML element
                const category = target.dataset.category || 'all';
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                target.classList.add('active');
                // Update current filter and redisplay inventory
                this.currentFilter = category;
                this.displayInventory();
            });
        });
        console.log("Category filters initialized"); // Debugging log
    }
    buyItem(item) {
        if (!this.inventory[item]) {
            alert(`Ez a tétel "${item}" nem található meg a webshopba.`);
            return;
        }
        const price = this.inventory[item].price;
        if (this.balance >= price) {
            this.addToCart(item, price);
        }
        else {
            alert(`Nem megfelelő egyenleg a ${item} megvásárlására. Az egyenlege ${this.balance} Ft, de ez a tétel ${price} Ft.`);
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
}
