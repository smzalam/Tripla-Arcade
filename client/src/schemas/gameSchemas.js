import { newBoard } from "../components/utility_funcs"

export const getInitialGameState = (rows, cols, mapper, players, channel) => {
    return {
        board: newBoard(rows, cols, mapper),
        player: players[0],
        turn: 'X',
        status: 'start',
        next_player: {
            'X': players[1],
            'O': players[0]
        },
        next_player_text: {
            'start': player => `It is player ${channel.state.members[player].user.name}'s turn.`,
            'finish': () => null
        },
        game_status_text: {
            'start': () => null,
            'finish': player => `Player ${channel.state.members[player].user.name} has won!`
        },
    }
}
