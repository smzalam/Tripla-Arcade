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
    switch(numOfUsers) {
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

io.on('connection', socket => {
    console.log(`User ${socket.id.substring(0,5)} connected!`)

    socket.on('clicked', data => {
        console.log(data)
    })

    socket.on('disconnect', () => {
        console.log(`User ${socket.id.substring(0,5)} disconnected!`)
    })

    socket.on('joinRoom', async (room) => {
        let clientsInRoom = 0;
        if (io.sockets.adapter.rooms.has(room)) clientsInRoom = io.sockets.adapter.rooms.get(room).size
        const clientID = socket.id
        console.log(clientID)
        switch(clientsInRoom) {
            case 0:
                socket.join(room);
                console.log(`User ${socket.id.substring(0,5)} has joined Room ${room}!`);
                console.log(clientsInRoom)
                break;
            case 1: 
                socket.join(room);
                console.log(`User ${socket.id.substring(0,5)} has joined Room ${room}!`);
                io.to(room).emit('roomFull', 'play')
                console.log(clientsInRoom)
                break;
            case 2:
                console.log('FULL ROOM')
                socket.emit('fullRoom')
                console.log(clientsInRoom)
                return 'full'
            default:
                return numOfUsers
        }
        // if (clientsInRoom !== 2) {
        //     socket.join(room)
        //     console.log(`User ${socket.id.substring(0,5)} has joined Room ${room}!`)
        // }
        // if (clientsInRoom === 2) {
        //     io.to(room).emit('roomFull', 'play')
        // }
    })

    socket.on('fullRoom', () => {
        socket.emit('fullRoomMessage', {message: "This room is full!"})
    })

})



server.listen(3001, () => { console.log("Server is running on port 3001.") })
instrument(io, { auth: false,  mode: "development" })


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