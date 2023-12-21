import { disconnect, joinRoom, leaveRoom, gameStart } from '../socketHandlers/connection.js'

export default function registerConnectionSockets(server) {
    server.socket.on('disconnect', () => disconnect(server))
    server.socket.on('handleDisconnect', (room) => disconnect(server, room))
    server.socket.on('joinRoom', (room) => joinRoom(server, room))
    server.socket.on('leaveRoom', (room) => leaveRoom(server, room))
    server.socket.on('gameStart', (room) => gameStart(server, room))
}