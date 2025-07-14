export {};

declare global {
    interface String {
        isEmpty(): boolean,
        isNotEmpty(): boolean,
    }
}