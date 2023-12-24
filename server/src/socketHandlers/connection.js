import { getInitialGameState } from '../utils/boardGenerationUtils.js';
import { getSocketRooms, getClientsInRoom, getRoomSockets, addPlayer, updatePlayers, disconnectPlayer } from './utils.js';
import { getGameState, updateGameStates, deleteGameState } from '../utils/gameStateUtils.js';
import Game from '../models/Game.js'


const playerDisconnect = async (server, room) => {
    // GETTING EXISTING GAME STATE FROM DATABASE
    console.log('START OF DISCONNECT');
    const gameState = await getGameState(room);
    console.log('GAME STATE: ', gameState)
    // LETTING USER LEAVE ROOM
    server.socket.leave(room);
    console.log(await getSocketRooms(server))
    // UPDATING PLAYERS IN EXISTING LOCAL GAME STATE
    disconnectPlayer(server, gameState)
        .then(async newGameState => {
            console.log('NEW GAME STATE: ', newGameState)
            console.log('hi');
            if (newGameState.players.length === 0) {
                console.log('hi');
                await deleteGameState(newGameState.room)
                console.log('hi');
                server.io.to(newGameState.room).emit('gameEnd', {})
            } else {
                // UPDATING PLAYERS IN GAME STATE IN DATABASE
                await updateGameStates(newGameState);

                // LETTING FRONTEND KNOW A USER HAS LEFT
                server.io.to(newGameState.room).emit('playerLeave', newGameState)
            }

        })
    console.log(`User ${server.socket.id.substring(0, 5)} disconnected from Room ${room}!`)
}

const joinRoom = async (server, room) => {
    // GETTING NUMBER OF CLIENTS IN ROOM
    const clientsInRoom = await getClientsInRoom(server, room);
    console.log('CLIENTSINROOM: ', clientsInRoom)

    // LETTING CLIENT JOIN ROOM IF ROOM IS NOT FULL, I.E. ROOM DOES NOT HAVE 2 PLAYERS YET
    if (clientsInRoom === 0 || clientsInRoom === 1) {
        server.socket.join(room);
        console.log(`User ${server.socket.id.substring(0, 5)} has joined Room ${room}!`);
    }

    console.log(await getSocketRooms(server))

    // CREATING OR GETTING GAME STATE FROM DATABASE
    const gameState = await getGameState(room);
    gameState.room = room // adding room number to gamestate
    console.log('GAME STATE: ', gameState)

    // ADDING PLAYER TO GAME STATE
    addPlayer(server, gameState)
        .then(async newGameState => {
            console.log('NEW GAME STATE: ', newGameState)
            await updateGameStates(newGameState); // updating gamestate in database
            console.log('HERE NOW')
            // JOINS USER AND UPDATES STATE IN FRONTEND IF ROOM IS NOT FULL
            // JOINS USER, STARTS GAME, AND UPDATES STATE IN FRONTEND IF ROOM IS FULL
            if (newGameState.players.length === 2) {
                server.io.to(newGameState.room).emit('roomFull', newGameState)
            } else {
                server.io.to(newGameState.room).emit('playerJoin', newGameState);
            }
        })

    // IF ROOM IS FULL AND ANOTHER USER TRIES TO JOIN, REQUEST IS REJECTED
    if (clientsInRoom === 2) {
        console.log('FULL ROOM')
        server.socket.emit('fullRoom')
    }
}

const leaveRoom = async (server, room) => {
    // GETTING EXISTING GAME STATE FROM DATABASE
    const gameState = await getGameState(room);
    console.log('GAME STATE: ', gameState)

    // LETTING USER LEAVE ROOM
    server.socket.leave(room);
    console.log(await getSocketRooms(server))
    // UPDATING PLAYERS IN EXISTING LOCAL GAME STATE
    updatePlayers(server, gameState)
        .then(async newGameState => {
            console.log('NEW GAME STATE: ', newGameState)
            console.log('hi');
            if (newGameState.players.length === 0) {
                console.log('hi');
                await deleteGameState(newGameState.room)
                console.log('hi');
                server.io.to(newGameState.room).emit('gameEnd', {})
            } else {
                // UPDATING PLAYERS IN GAME STATE IN DATABASE
                await updateGameStates(newGameState);

                // LETTING FRONTEND KNOW A USER HAS LEFT
                server.io.to(newGameState.room).emit('playerLeave', newGameState)
            }

        })
    console.log(`User ${server.socket.id.substring(0, 5)} has left Room ${room}!`);
}

const gameStart = async (server, room) => {
    const gameState = await getGameState(room);
    console.log('GAME STATE: ', gameState)
    if (gameState.players.length === 2) {
        gameState.nextPlayer = {
            'X': gameState.players[1],
            'O': gameState.players[0]
        }
        gameState.currentPlayer = gameState.players[0]
        gameState.playersJoined = gameState.players.length === 2 ? true : false
        console.log(gameState)
        await updateGameStates(gameState);
        server.io.to(gameState.room).emit('gameStartState', gameState)
     }
}

export {
    playerDisconnect,
    joinRoom,
    leaveRoom,
    gameStart
}