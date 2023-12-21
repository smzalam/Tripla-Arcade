const getSocketRooms = async (server) => {
    const sockets = server.socket.rooms
    console.log(sockets)
    var room = '';
    if (sockets.size === 2) {
        for (const socket of sockets) {
            room = socket
        }
        return room
    }
}

const getClientsInRoom = async (server, room) => {
    console.log('in getClientsInRoom')
    let clientsInRoom = 0;
    if (server.io.sockets.adapter.rooms.has(room)) clientsInRoom = server.io.sockets.adapter.rooms.get(room).size
    return clientsInRoom;
}

const getRoomSockets = async (server, room) => {
    console.log('in getRoomSockets')
    const sockets = await server.io.in(room).fetchSockets()
    const players = []
    for (const socket of sockets) {
        players.push(socket.id)
    }
    console.log('GETROOMSOCKETS: ', players)
    return players
}

const updatePlayers = async (server, gameState) => {
    console.log('in updatePlayers')
    console.log('GAME STATE: ', gameState);
    const playerIds = await getRoomSockets(server, gameState.room)
    console.log('PlayerIDs: ', playerIds)
    const remainingPlayers = gameState.players.filter((player) => {
        if (playerIds.includes(player)) {
            return player
        }
    })
    gameState.players = remainingPlayers
    gameState.playersJoined = gameState.players.length === 2 ? true : false
    console.log('GAME STATE: ', gameState);
    return gameState;
}

const addPlayer = async (server, gameState) => {
    console.log('in addPlayer')
    console.log('GAME STATE: ', gameState);
    const playerIds = await getRoomSockets(server, gameState.room)
    console.log('PlayerIDs: ', playerIds)
    playerIds.forEach(playerId => {
        if (!gameState.players.includes(playerId)) {
            gameState.players.push(playerId)
        }
        return playerId
    })
    console.log('GAME STATE: ', gameState);
    return gameState;
}

export {
    getSocketRooms,
    getClientsInRoom,
    getRoomSockets,
    updatePlayers,
    addPlayer
}