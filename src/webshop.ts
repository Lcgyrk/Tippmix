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
            console.log(this.balance);
            
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
    new WebShop(682357236423423);
});



//ez majd a main.ts-be megy
document.addEventListener("DOMContentLoaded", () => {
    const stakeInput = document.getElementById("stake1") as HTMLInputElement;
    const placeBetButton = document.querySelector(".btn-success") as HTMLButtonElement;

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
        
        const WinOrLose = Math.random()
        let DidWin:any = false;
        if(WinOrLose >= 0 && WinOrLose <= 0.4){
            DidWin = true;
        }
        else if(WinOrLose >= 0.4 && WinOrLose <= 0.8){
            DidWin = false;
        }
        else{
            DidWin = null; //döntetlen
        }


    });
});