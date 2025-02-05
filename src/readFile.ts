interface User {
    id: number;
    name: string;
    email: string;
    credits: number;
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

export async function FetchBets(): Promise<Bet[]> {
    const response = await fetch("http://localhost:3000/bets");
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}

export async function FetchCurrentMatches(): Promise<Bet[]> {
    const response = await fetch("http://localhost:3000/currentMatches");
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}
