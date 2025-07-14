export {};

declare global {
    interface Number {
        isNegative(): boolean
    }
}