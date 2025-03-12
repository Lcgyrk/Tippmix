export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface Bet {
    id: number;
    sport: string;
    homeTeam: string;
    awayTeam: string;
    homeOdds: number;
    awayOdds: number;
    drawOdds: number | null;
}

let users: User[] = [];
let usersloaded = false;

export async function FetchBets(): Promise<Bet[]> {
    const response = await fetch("http://localhost:3000/bets");
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}

async function FetchUsers() {
    if (usersloaded) return;

    try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();

        users = data.map((user: any) => ({
            ...user,
            id: Number(user.id),
        }));

        usersloaded = true;
        console.log("Users loaded:", users);
        localStorage.setItem("allUsers", JSON.stringify(users));
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}

FetchUsers();

export { users };
