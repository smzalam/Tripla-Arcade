import Game from '../models/Game.js';
import {
    createInitialGameState,
    deleteExistingRoom,
    findExistingRoom,
    updateGameState
} from "../database/gameStateQueries.js";
import { getInitialGameState } from "./boardGenerationUtils.js";

const getGameState = async (room) => {
    console.log('ROOM: ', room)
    console.log('in getGameState')
    const existingRoom = await findExistingRoom(room);
    console.log('EXISTING ROOM: ', existingRoom)
    if (existingRoom) {
        return existingRoom
    } else {
        const initialGameState = getInitialGameState(3, 3, () => "")
        const gameState = await createInitialGameState({...initialGameState})
        return gameState
    }
}

const updateGameStates = async (gameState) => {
    console.log('in updateGameStates')
    const updatedGameState = await updateGameState(gameState)
    console.log('UPDATED GAME STATE NEWGAME STARE: ', updatedGameState);
    return updatedGameState;
}

const deleteGameState = async (room) => {
    console.log('in deleteGameState')
    const deleted = await deleteExistingRoom(room);
    return deleted;
}

export {
    getGameState,
    updateGameStates,
    deleteGameState
}