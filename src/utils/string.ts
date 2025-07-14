String.prototype.isEmpty = function (): boolean {
    const value = this as string;
    
    if (value.trim().length == 0 || value == null || value == undefined) {
        return true;
    }

    return false;
}

String.prototype.isNotEmpty = function (): boolean {
    const value = this as string;

    if (value.trim().length >= 1) {
        return true;
    }

    return false
}