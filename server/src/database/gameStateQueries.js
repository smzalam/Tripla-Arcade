import GameState from '../models/GameState.js';

const createInitialGameState = async (gameState) => {
    console.log('in createInitialGameState')
    const initialGameState = await GameState.create({ ...gameState })
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
    const existingGameState = await GameState.find({room: room})
    if (existingGameState.length) {
        return existingGameState[0]
    } else {
        return false
    }
}

const deleteExistingRoom = async (room) => {
    console.log('in deleteExistingRoom')
    const deleted = await GameState.deleteOne({ room: room})
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