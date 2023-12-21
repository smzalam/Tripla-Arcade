import { gameMove, gameReset } from '../socketHandlers/gameEvents.js'

export default function registerGameEventsSockets(server) {
    server.socket.on('gameMove', (room, data) => gameMove(server, room, data))
    server.socket.on('gameReset', (room, data) => gameReset(server, room, data))
}