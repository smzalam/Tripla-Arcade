import express from "express"
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { instrument } from '@socket.io/admin-ui';

dotenv.config()

const app = express();
app.use(cors())
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://admin.socket.io"],
        credentials: true,
    }
});

const roomState = (numOfUsers) => {
    switch (numOfUsers) {
        case 0:
            return 'empty'
        case 1:
            return 'person'
        case 2:
            return 'full'
        default:
            return 'empty'
    }
}

const getRoomSockets = async (room) => {
    const sockets = await io.in(room).fetchSockets()
    const players = []
    for (const socket of sockets) {
        // console.log('HERE')
        // console.log('ID: ', socket.id);
        // console.log('HANDSHAKE: ', socket.handshake);
        // console.log('ROOMS: ', socket.rooms);
        // console.log('DATA: ', socket.data);
        // console.log('HERE')
        players.push(socket.id)
    }
    return players
}

const generateGrid = (rows, columns, mapper) => {
    return Array(rows).fill().map(() => Array(columns).fill().map(mapper))
}
const newBoard = (rows, columns, mapper) => generateGrid(rows, columns, mapper);

const getInitialGameState = (rows, cols, mapper) => {
    const gameState = {
        room: '',
        board: newBoard(rows, cols, mapper),
        players: [],
        turn: 'X',
        status: 'start'
    }

    return gameState
}
const initialGameState = getInitialGameState(3, 3, () => "");

// if (players.length !== 0) {
//     gameState['next_player'] = {
//         'X': players[1],
//         'O': players[0]
//     }
//     gameState['currentPlayer'] = players[0]
//     gameState['playersJoined'] = players.length === 2 ? true : false
// }

io.on('connection', socket => {
    console.log(`User ${socket.id.substring(0, 5)} connected!`)

    socket.on('disconnect', () => {
        getRoomSockets(initialGameState.room)
            .then(playerIds => {
                console.log('PLAYERIDS AFTER USER LEFT: ', playerIds)
                const remainingPlayers = initialGameState.players.filter((player) => {
                    if (playerIds.includes(player)) {
                        return player
                    }
                })
                initialGameState.players = remainingPlayers
                initialGameState.playersJoined = initialGameState.players.length === 2 ? true : false
                console.log(initialGameState)
                io.to(initialGameState.room).emit('playerLeave', initialGameState)
            });
        console.log(`User ${socket.id.substring(0, 5)} disconnected!`)
    })

    socket.on('getPlayersInRoom', async (room) => {
        const sockets = await io.in(room).fetchSockets();
        return sockets;
    })

    socket.on('joinRoom', (room) => {
        let clientsInRoom = 0;
        if (io.sockets.adapter.rooms.has(room)) clientsInRoom = io.sockets.adapter.rooms.get(room).size
        if (clientsInRoom === 0 || clientsInRoom === 1) {
            socket.join(room);
            console.log(`User ${socket.id.substring(0, 5)} has joined Room ${room}!`);
            console.log(clientsInRoom)
        }
        // if (clientsInRoom === 1) {
        getRoomSockets(room)
            .then(playerIds => {
                console.log(initialGameState)
                initialGameState.room = room
                playerIds.forEach(playerId => {
                    if (!initialGameState.players.includes(playerId)) {
                        initialGameState.players.push(playerId)
                    }
                    return playerId
                })
                console.log(initialGameState)
                console.log('PLAYERS IN SERVER: ', initialGameState.players);
                io.to(initialGameState.room).emit('playerJoin', initialGameState);
                if (initialGameState.players.length === 2) io.to(initialGameState.room).emit('roomFull', initialGameState)
            });
        // }
        if (clientsInRoom === 2) {
            console.log('FULL ROOM')
            socket.emit('fullRoom')
            console.log(clientsInRoom)
        }
    })

    // socket.on('roomFull', () => {
    //     socket.emit('fullRoomMessage', {message: "This room is full!"})
    // })

    socket.on('leaveRoom', () => {
        socket.leave(initialGameState.room);
        getRoomSockets(initialGameState.room)
            .then(playerIds => {
                console.log('PLAYERIDS AFTER USER LEFT: ', playerIds)
                const remainingPlayers = initialGameState.players.filter((player) => {
                    if (playerIds.includes(player)) {
                        return player
                    }
                })
                initialGameState.players = remainingPlayers
                initialGameState.playersJoined = initialGameState.players.length === 2 ? true : false
                console.log(initialGameState)
                io.to(initialGameState.room).emit('playerLeave', initialGameState)
            });
        console.log(`User ${socket.id.substring(0, 5)} has left Room ${initialGameState.room}!`);
    })

    socket.on('gameStart', (initialGameState) => {
        console.log('HI: ', initialGameState)
        if (initialGameState.players.length === 2) {
            initialGameState['next_player'] = {
                'X': initialGameState.players[1],
                'O': initialGameState.players[0]
            }
            initialGameState['currentPlayer'] = initialGameState.players[0]
            initialGameState['playersJoined'] = initialGameState.players.length === 2 ? true : false
            console.log(initialGameState)
        }
        io.to(initialGameState.room).emit('gameStartState', initialGameState)
    })

    socket.on('playerMove', data => {
        const newData = { ...data, playerID: socket.id }
        io.to(data.room).emit('gameMove', newData)
    })


})



server.listen(3001, () => { console.log("Server is running on port 3001.") })
instrument(io, { auth: false, mode: "development" })


// app.use(cors());
// app.use(express.json());

// const apiKey = process.env.apiKey;
// const apiSecret = process.env.apiSecret;

// const serverClient = new StreamChat.getInstance(apiKey, apiSecret);

// app.post("/signup", async (req, res) => {
//     try {
//         const { firstName, lastName, userName, password } = req.body;
//         const userID = uuidv4();
//         const token = serverClient.createToken(userID);
//         const hashedPassword = await bcrypt.hash(password, 10);
//         res.json({ token, userID, firstName, lastName, userName, hashedPassword });
//     } catch (error) {
//         res.json(error);
//     }
// })

// app.post("/login", async (req, res) => {
//     try {
//         const { userName, password } = req.body;
//         const { users } = await serverClient.queryUsers({ name: userName });
//         if (users.length == 0) return res.json({ message: "User not found." });
//         const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);
//         const token = serverClient.createToken(users[0].id)
//         if (passwordMatch) {
//             res.json({ token, firstName: users[0].firstName, lastName: users[0].lastName, userName: users[0].name, userID: users[0].id })
//         }
//     } catch (error) {
//         res.json(error)
//     }
// })