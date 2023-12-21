import express from "express"
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import createSocket from "./sockets/index.js";
import mongoose from 'mongoose';
// import {
//     createInitialGameState,
//     updateGameState,
//     findExistingRoom,
//     deleteExistingRoom
// }
//     from "./database/gameStateQueries.js";
// import { newBoard } from "./utils/boardGenerationUtils.js";

dotenv.config()

const conn = await mongoose.connect(
    process.env.MONGODB,
    {
        dbName: 'tripla'
    }
)
console.log(`Connected to DB @ ${conn.connection.host}!`)

const app = express();
const server = createServer(app);
createSocket(server);

// const game = await createInitialGameState({
//     room: '',
//     board: newBoard(3, 3, () => ""),
//     players: [],
//     turn: 'X',
//     status: 'start'
// })

// console.log('GAME: ', game)
// game.room = 'test'
// const newGame = await updateGameState(game)
// console.log('NEWGAME: ', newGame)
// const existingRoom = await findExistingRoom('test')
// console.log(existingRoom)
// const nonexistentroom = await findExistingRoom('1')
// console.log(nonexistentroom)
// const deleted = await deleteExistingRoom('test')
// console.log(deleted)



server.listen(3001, () => { console.log("Server is running on port 3001.") })


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