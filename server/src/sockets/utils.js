const getSocketRooms = async (socket) => {
    const sockets = socket.rooms
    console.log(sockets)
    var room = '';
    if (sockets.size === 2) {
        for (const socket of sockets) {
            room = socket
        }
        return room
    }
}

export {
    getSocketRooms
}