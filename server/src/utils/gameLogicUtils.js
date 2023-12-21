const checkValues = (a, b, c) => {
    if (!a || !b || !c) return false
    return a == b && b == c;
}

export {
    checkValues,
}