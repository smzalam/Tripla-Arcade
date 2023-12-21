import {
    updateGameStates,
} from '../../utils/gameStateUtils.js'
import { newBoard } from '../../utils/boardGenerationUtils.js'
import { checkForWinttt, checkForDrawttt } from './gameWinCon.js';

const TicTacToeGameMoveLogic = async (server, gameState, data) => {
    const { x, y } = data
    if (gameState.status === 'finish') {
        server.io.to(gameState.room).emit('resolvedGameMove', gameState)
    } else if (server.socket.userID !== gameState.currentPlayer || gameState.board[y][x] !== '') {
        server.io.to(gameState.room).emit('resolvedGameMove', gameState)
    } else {
        gameState.board[y][x] = gameState.turn
        if (checkForWinttt(gameState.board)) {
            gameState.status = "finish";
            await updateGameStates(gameState);
            server.io.to(gameState.room).emit('gameEnd', gameState)
        } else {
            if (checkForDrawttt(gameState.board)) {
                gameState.board = newBoard(3, 3, () => "")
            }
            gameState.currentPlayer = gameState.nextPlayer[gameState.turn];
            gameState.turn = gameState.turn === 'X' ? 'O' : 'X'
            await updateGameStates(gameState);

            server.io.to(gameState.room).emit('resolvedGameMove', gameState)
        }
    }
} 

const TicTacToeGameResetLogic = async (server, gameState) => {
    gameState.board = newBoard(3, 3, () => "")
    gameState.currentPlayer = gameState.players[0]
    gameState.status = 'start'
    gameState.turn = 'X'
    await updateGameStates(gameState);
    server.io.to(gameState.room).emit('resetGameBoard', gameState)
}

export {
    TicTacToeGameMoveLogic,
    TicTacToeGameResetLogic
}