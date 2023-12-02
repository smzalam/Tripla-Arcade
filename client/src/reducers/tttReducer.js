import { checkForDrawttt, checkForWinttt, clone, flatten } from "../utils/utility_funcs";

function tttReducer(state, action) {

    if (state.status === 'finish' && action.type !== 'RESET') {
        return state;
    }

    switch (action.type) {
        case 'CLICK': {
            const { x, y } = action.payload;
            const nextState = clone(state);
            const { board, player, turn, next_player } = nextState;

            if (player !== action.currentPlayer || board[y][x]) {
                return state;
            }

            board[y][x] = turn;

            const flatGrid = flatten(board)
            if (checkForWinttt(flatGrid)) {
                nextState.status = "finish";
                return nextState;
            }
            if (checkForDrawttt(flatGrid)) {
                return action.default
            }

            if (action.changeTurn === 'true') {
                nextState.player = next_player[turn];
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

export default tttReducer