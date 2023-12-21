import { nanoid } from 'nanoid';

const generateGrid = (rows, columns, mapper) => {
    return Array(rows).fill().map(() => Array(columns).fill().map(mapper))
}
const newBoard = (rows, columns, mapper) => generateGrid(rows, columns, mapper);

const getInitialGameState = (rows, cols, mapper) => {
    const gameState = {
        room: nanoid(),
        board: newBoard(rows, cols, mapper),
        players: [],
        turn: 'X',
        status: 'start'
    }

    return gameState
}

export {
    getInitialGameState,
}