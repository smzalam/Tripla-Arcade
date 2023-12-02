import { checkForDrawc4, checkForWinc4, clone } from "../utils/utility_funcs";

function c4Reducer(state, action) {
    if (state.status === 'finish' && action.type !== 'RESET') {
        return state;
    }

    switch (action.type) {
        case 'CLICK': {
            const { emptyCellPlace, x } = action.payload;
            console.log(emptyCellPlace, ':', x)
            const nextState = clone(state);
            const { board, player, turn } = nextState;
            console.log('board: ', board)
            if (player !== action.currentPlayer) {
                return state;
            }
            for (var i = 5; i >= 0; i--) {
                if (board[i][x] === '') {
                    board[i][x] = turn
                    break;
                }
            }
            console.log(checkForDrawc4(board))
            if (checkForWinc4(board) === 1) {
                nextState.status = "finish";
                return nextState;
            }
            if (checkForDrawc4(board) === 1) {
                return action.default
            }
            if (action.changeTurn == 'true') {
                nextState.player = action.players[turn];
                nextState.turn = turn === 'X' ? 'O' : 'X';
            }
            return nextState;
        }

        case 'RESET': {
            const board = action.state.board
            console.log(board)
            return action.state;
        }

        default:
            return state;
    }
}

export default c4Reducer