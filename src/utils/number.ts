Number.prototype.isNegative = function (): boolean {
    const value = this as number

    if (value < 0) return true
    else return false
}