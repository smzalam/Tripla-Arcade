import { newBoard } from "../utils/utility_funcs"

export const getInitialGameState = (rows, cols, mapper, players) => {
    return {
        board: newBoard(rows, cols, mapper),
        player: players[0],
        turn: 'X',
        status: 'start',
        next_player: {
            'X': players[1],
            'O': players[0]
        },
    }
}

export const NEXT_PLAYER_TEXT = {
    'start': player_name => `It is player ${player_name}'s turn.`,
    'finish': () => null
}

export const GAME_STATUS_TEXT = {
    'start': () => null,
    'finish': player_name => `Player ${player_name} has won!`
}