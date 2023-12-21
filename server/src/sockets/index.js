import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

import registerConnectionSockets from './connection.js'
import registerGameEventsSockets from './gameEvents.js'

const createSocket = (app) => {
    const io = new Server(app, {
        cors: {
            origin: ["http://localhost:5173", "https://admin.socket.io"],
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        console.log(`User ${socket.id.substring(0, 5)} connected!`)
        const server = {
            socket,
            io,
            games: {}
        };
        registerConnectionSockets(server);
        registerGameEventsSockets(server);
        
    })

    instrument(io, { auth: false, mode: "development" })

};

export default createSocket;