const clone = (x) => JSON.parse(JSON.stringify(x))

const generateGrid = (rows, columns, mapper) => {
    return Array(rows).fill().map(() => Array(columns).fill().map(mapper))
}
const newTicTacToeBoard = (rows, columns, mapper) => generateGrid(rows, columns, mapper);

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const flatten = array => array.reduce((acc, cur) => [...acc, ...cur], [])

const checkValues = (a, b, c) => {
    if (!a || !b || !c) return false
    return a == b && b == c;
}

const checkForWin = flatGrid => {
    // Because our grid is flat, we can use array destructuring to
    // define variables for each square, I will use the points on a
    // compass as my variable names
    const [nw, n, ne, w, c, e, sw, s, se] = flatGrid

    // Then we simply run `checkValues` on each row, column and diagonal
    // If it's true for any of them, the game has been won!
    return (
        checkValues(nw, n, ne) ||
        checkValues(w, c, e) ||
        checkValues(sw, s, se) ||
        checkValues(nw, w, sw) ||
        checkValues(n, c, s) ||
        checkValues(ne, e, se) ||
        checkValues(nw, c, se) ||
        checkValues(ne, c, sw)
    )
}

function checkForDraw(flatGrid) {
    return (
        !checkForWin(flatGrid) &&
        flatGrid.filter(Boolean).length === flatGrid.length
    )
}

export { clone, generateGrid, newTicTacToeBoard, winningPatterns, flatten, checkValues, checkForWin, checkForDraw };