const NEXT_PLAYER_TEXT = {
    'start': player_name => `It is player ${player_name}'s turn.`,
    'finish': () => null
}

const GAME_STATUS_TEXT = {
    'start': () => null,
    'finish': player_name => `Player ${player_name} has won!`
}

export {
    NEXT_PLAYER_TEXT,
    GAME_STATUS_TEXT
}