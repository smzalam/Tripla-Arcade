import GamesList from "../models/GamesList.js";

const createGame = async (game) => {
    console.log('in createInitialGameState')
    const newGame = await GamesList.create({ ...game })
    return newGame
}

const updateGame = async (updatedGame) => {
    console.log('in updateGame')
    const newGame = await updatedGame.save()
    console.log('UPDATED GAME NEWGAME : ', newGame);
    return newGame;
}

const findGame = async (game) => {
    console.log('GAME: ', game)
    console.log('in findGame')
    const existingGame = await GamesList.find({game: game})
    if (existingGame.length) {
        return existingGame[0]
    } else {
        return false
    }
}

const findAllGames = async () => {
    console.log('in findAllGames')
    const existingGame = await GamesList.find({})
    console.log(existingGame)
    if (existingGame.length) {
        return existingGame
    } else {
        return false
    }
}

const deleteGame = async (game) => {
    console.log('in deleteGame')
    const deleted = await GamesList.deleteOne({ game: game})
    console.log(deleted)
    if (deleted.deletedCount === 1) {
        return true
    } else {
        return false
    }
}

export {
    createGame,
    updateGame,
    findGame,
    findAllGames,
    deleteGame
}