import { checkForDrawc4, checkForWinc4, clone } from "../utils/utility_funcs";

function c4Reducer(state, action) {
    if (state.status === 'finish' && action.type !== 'RESET') {
        return state;
    }

    switch (action.type) {
        case 'CLICK': {
            const { x } = action.payload;
            const nextState = clone(state);
            const { board, player, turn, next_player } = nextState;

            if (player !== action.currentPlayer) {
                return state;
            }

            for (var i = 5; i >= 0; i--) {
                if (board[i][x] === '') {
                    board[i][x] = turn
                    break;
                }
            }

            if (checkForWinc4(board) === 1) {
                nextState.status = "finish";
                return nextState;
            }
            if (checkForDrawc4(board) === 1) {
                return action.default
            }

            if (action.changeTurn == 'true') {
                nextState.player = next_player[turn];
                nextState.turn = turn === 'X' ? 'O' : 'X';
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

export default c4Reducer