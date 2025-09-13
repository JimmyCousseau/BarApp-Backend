import { AuthTokens } from "../entities/AuthTokens"

export function millisecondsToMinutes(ms: number): number {
    return ms / 60000
}

export function getActualTimeInMinutes(): number {
    return millisecondsToMinutes(new Date().getTime())
}

export function hoursToMinutes(h: number): number {
    return h * 60
}

export function isTokenExpired(token: AuthTokens): boolean {
    return token.expiration_date < getActualTimeInMinutes()
}
