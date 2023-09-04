import { checkForDraw, checkForWin, clone, flatten } from "./utility_funcs"

function tttReducer(state, action) {

    if (state.status === 'finish' && action.type !== 'RESET') {
        return state;
    }

    switch (action.type) {
        case 'CLICK': {
            const { x, y } = action.payload;
            const nextState = clone(state);
            const { board, player, turn } = nextState;
            if (player !== action.currentPlayer || board[y][x]) {
                return state;
            }
            board[y][x] = turn;
            const flatGrid = flatten(board)
            console.log(flatGrid)
            if (checkForWin(flatGrid)) {
                nextState.status = "finish";
                return nextState;
            }
            if (checkForDraw(flatGrid)) {
                return action.default
            }
            if (action.changeTurn == 'true') {
                nextState.player = action.players[turn];
                nextState.turn = turn === 'X' ? 'O' : 'X'
            }
            return nextState;
        }

        case 'RESET': {
            return action.state;
        }

        default:
            return state;
    }
}


function c4Reducer(state, action) {
    if (state.status === 'finish' && action.type !== 'RESET') {
        return state;
    }

    switch (action.type) {
        case 'CLICK': {
            const { x, y } = action.payload;
            const nextState = clone(state);
            const { board, player, turn, fill } = nextState;
            if (player !== action.currentPlayer || board[y][x]) {
                return state;
            }
            board[y][x] = turn;
            const flatGrid = flatten(board)
            console.log(flatGrid)
            if (checkForWin(flatGrid)) {
                nextState.status = "finish";
                return nextState;
            }
            if (checkForDraw(flatGrid)) {
                return action.default
            }
            if (action.changeTurn == 'true') {
                nextState.player = action.players[turn];
                nextState.turn = turn === 'X' ? 'O' : 'X';
                nextState.fill = fill === 'rose' ? 'amber' : 'rose'
            }
            return nextState;
        }

        case 'RESET': {
            return action.state;
        }

        default:
            return state;
    }
}

export { tttReducer, c4Reducer }