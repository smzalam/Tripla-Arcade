import {
    createGame,
    updateGame,
    findGame,
    findAllGames,
    deleteGame
} from '../database/gameListQueries.js'

const getGameDescription = async (game) => {
    const existingGame = await findGame(game);
    if (existingGame) {
        return existingGame
    } else {
        return false
    }
}

const getAllGameDescriptions = async () => {
    const existingGame = await findAllGames();
    console.log(existingGame)
    if (existingGame) {
        return existingGame
    } else {
        return false
    }
}

const createGameDescription = async (game) => {
    const newGame = await createGame(game);
    return newGame
}

const updateGameDescription = async (game) => {
    const updatedGame = await updateGame(game)
    return updatedGame;
}

export {
    getGameDescription,
    getAllGameDescriptions,
    createGameDescription,
    updateGameDescription
}