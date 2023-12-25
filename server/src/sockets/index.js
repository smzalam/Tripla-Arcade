import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import crypto from 'crypto';
import registerConnectionSockets from './connection.js'
import registerGameEventsSockets from './gameEvents.js'
import { InMemorySessionStore } from './sessionStore.js';
import { getSocketRooms } from './utils.js'
import 'dotenv/config'


const randomId = () => crypto.randomBytes(8).toString("hex");
const sessionStore = new InMemorySessionStore();
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin)
const createSocket = (app) => {
    const io = new Server(app, {
        cors: {
            origin: (origin, callback) => {
                allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'))
            },
            credentials: true,
        }
    });

    io.use(async (socket, next) => {
        const sessionID = socket.handshake.auth.sessionID;
        console.log('SOCKETAUTHSESSIONID: ', sessionID)
        if (sessionID) {
            // find existing session
            const session = sessionStore.findSession(sessionID);
            const allSessions = sessionStore.findAllSessions();
            console.log(allSessions)
            if (session) {
                socket.sessionID = sessionID;
                socket.userID = session.userID;
                return next();
            }
        }
        socket.sessionID = randomId();
        socket.userID = randomId();
        next();
    });

    io.on('connection', async (socket) => {
        sessionStore.saveSession(socket.sessionID, {
            userID: socket.userID,
            connected: true,
        });
        socket.emit('session', {
            sessionID: socket.sessionID,
            userID: socket.userID
        })
        // console.log(socket)
        console.log(`User ${socket.id.substring(0, 5)} connected!`)

        socket.on("disconnect", async () => {
            const matchingSockets = await io.in(socket.userID).fetchSockets();
            const isDisconnected = matchingSockets.size === 0;
            if (isDisconnected) {
                // update the connection status of the session
                sessionStore.saveSession(socket.sessionID, {
                    userID: socket.userID,
                    connected: false,
                });
            }
        })

        const server = {
            socket,
            io,
            games: {},
            sessionStore
        };
        registerConnectionSockets(server);
        registerGameEventsSockets(server);

    })

    instrument(io, { auth: false, mode: "development" })

};

export default createSocket;