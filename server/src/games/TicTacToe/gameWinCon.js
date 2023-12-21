import { checkValues } from "../../utils/gameLogicUtils.js"
import { flatten } from "../../utils/boardGenerationUtils.js"

const checkForWinttt = gameBoard => {
    const flatGrid = flatten(gameBoard)
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

const checkForDrawttt = gameBoard => {
    const flatGrid = flatten(gameBoard)

    return (
        !checkForWinttt(flatGrid) &&
        flatGrid.filter(Boolean).length === flatGrid.length
    )
}

export {
    checkForDrawttt,
    checkForWinttt
}


