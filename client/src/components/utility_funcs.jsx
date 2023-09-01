const clone = (x) => JSON.parse(JSON.stringify(x))

const generateGrid = (rows, columns, mapper) => {
    return Array(rows).fill().map(() => Array(columns).fill().map(mapper))
}
const newTicTacToeBoard = (rows, columns, mapper) => generateGrid(rows, columns, mapper);

export { clone, generateGrid, newTicTacToeBoard };