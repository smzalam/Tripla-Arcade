const clone = (x) => JSON.parse(JSON.stringify(x))

const generateGrid = (rows, columns, mapper) => {
    return Array(rows).fill().map(() => Array(columns).fill().map(mapper))
}
const newBoard = (rows, columns, mapper) => generateGrid(rows, columns, mapper);

const flatten = array => array.reduce((acc, cur) => [...acc, ...cur], [])

const checkValues = (a, b, c) => {
    if (!a || !b || !c) return false
    return a == b && b == c;
}

const checkForWinttt = flatGrid => {
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

const checkVertical = (board) => {
    // Check only if row is 3 or greater
    for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r - 1][c] &&
                    board[r][c] === board[r - 2][c] &&
                    board[r][c] === board[r - 3][c]
                ) {
                    return 1;
                }
            }
        }
    }
}

const checkHorizontal = (board) => {
    // Check only if column is 3 or less
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r][c + 1] &&
                    board[r][c] === board[r][c + 2] &&
                    board[r][c] === board[r][c + 3]
                ) {
                    return 1;
                }
            }
        }
    }
}

const checkDiagonalRight = (board) => {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r - 1][c + 1] &&
                    board[r][c] === board[r - 2][c + 2] &&
                    board[r][c] === board[r - 3][c + 3]
                ) {
                    return 1;
                }
            }
        }
    }
}

const checkDiagonalLeft = (board) => {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 6; r++) {
        for (let c = 3; c < 7; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r - 1][c - 1] &&
                    board[r][c] === board[r - 2][c - 2] &&
                    board[r][c] === board[r - 3][c - 3]
                ) {
                    return 1;
                }
            }
        }
    }
}

const checkForDrawc4 = (board) => {
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            if (board[r][c] === '') {
                return null
            }
        }
    }
    return 1;
}

const checkForWinc4 = (board) => {
    return (
        checkVertical(board) ||
        checkDiagonalRight(board) ||
        checkDiagonalLeft(board) ||
        checkHorizontal(board)
    )
}

function checkForDrawttt(flatGrid) {
    return (
        !checkForWinttt(flatGrid) &&
        flatGrid.filter(Boolean).length === flatGrid.length
    )
}

export { clone, generateGrid, newBoard, flatten, checkValues, checkForWinttt, checkForWinc4, checkForDrawttt, checkForDrawc4 };