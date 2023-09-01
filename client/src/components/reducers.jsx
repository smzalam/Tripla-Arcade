import { clone } from "./utility_funcs"

function tttReducer(state, action) {
    switch (action.type) {
        case 'CLICK': {
            const { x, y } = action.payload;
            const nextState = clone(state);
            const { board, player, turn } = nextState;
            if (player !== turn || board[y][x]) {
                return state;
            }
            nextState.turn = turn === 'X' ? 'O' : 'X';
            board[y][x] = player;
            console.log('initial turn: ', nextState.turn)
            console.log('initial player: ', nextState.player)
            nextState.player = player === 'X' ? 'O' : 'X';
            console.log('final turn: ', nextState.turn)
            console.log('final player: ', nextState.player)
            return nextState;
        }

        case 'RESET': {
            return action.state;
        }

        default:
            return state;
    }
}

function replicaReducer(state, action) {
    switch (action.type) {
        case 'REPLICATE': {
            const { x, y, player } = action.payload;
            const nextState = clone(state);
            const { board } = nextState;

            board[y][x] = player;

            nextState.player = player === 'X' ? 'O' : 'X';
            nextState.turn = nextState.player;
            console.log(nextState)
            return nextState;
        }

        default:
            return state;
    }
}

export { tttReducer, replicaReducer }