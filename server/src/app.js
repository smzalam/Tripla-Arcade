import dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import { createServer } from 'node:http';

import createSocket from "./sockets/index.js";
import gamesRouter from './routes/games.js'
import authRouter from './routes/auth.js';

dotenv.config()
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

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

app.use(cors(
    {
        origin: (origin, callback) => {
            allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'))
        },
    }
))

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.use('/games', gamesRouter)
app.use('/auth', authRouter)

server.listen(process.env.PORT, () => { console.log(`Server is running on port ${process.env.PORT}.`) })
