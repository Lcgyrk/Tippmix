declare interface User {
    id: number,
    name: string,
    email: string,
    credits: number
}

declare interface Bet {
    id: number,
    sport: string,
    homeTeam: string,
    awayTeam: string,
    homeOdds: number,
    awayOdds: number,
    drawOdds: number | null
}







