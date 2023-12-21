import Game from '../models/Game.js';

const createInitialGameState = async (gameState) => {
    console.log('in createInitialGameState')
    const initialGameState = await Game.create({ ...gameState })
    return initialGameState
}

const updateGameState = async (updatedGameState) => {
    console.log('in updateGameState')
    const newGameState = await updatedGameState.save()
    console.log('UPDATED GAME STATE NEWGAME STARE: ', newGameState);
    return newGameState;
}

const findExistingRoom = async (room) => {
    console.log('ROOM: ', room)
    console.log('in findExistingRoom')
    const existingGameState = await Game.find({room: room})
    if (existingGameState.length) {
        return existingGameState[0]
    } else {
        return false
    }
}

const deleteExistingRoom = async (room) => {
    console.log('in deleteExistingRoom')
    const deleted = await Game.deleteOne({ room: room})
    console.log(deleted)
    if (deleted.deletedCount === 1) {
        return true
    } else {
        return false
    }
}

export {
    createInitialGameState,
    updateGameState,
    findExistingRoom,
    deleteExistingRoom
}