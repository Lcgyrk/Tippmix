export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    credits?: number
}
export interface Bet {
    id: number,
    sport: string,
    homeTeam: string,
    awayTeam: string,
    homeOdds: number,
    awayOdds: number,
    drawOdds?: number | null
}
