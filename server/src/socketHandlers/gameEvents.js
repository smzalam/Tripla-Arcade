import {
    getGameState,
} from '../utils/gameStateUtils.js'
import { TicTacToeGameMoveLogic, TicTacToeGameResetLogic } from '../games/TicTacToe/gameLogic.js';

const gameMove = async (server, room, data) => {
    const gameState = await getGameState(room);
    if (data.game === 'TicTacToe') {
        TicTacToeGameMoveLogic(server, gameState, data);
    } else {
        TicTacToeGameMoveLogic(server, gameState, data);
    }
}


const gameReset = async (server, room, data) => {
    const gameState = await getGameState(room);
    if (data.game === 'TicTacToe') {
        TicTacToeGameResetLogic(server, gameState);
    } else {
        TicTacToeGameResetLogic(server, gameState);
    }
}

export {
    gameMove,
    gameReset
}