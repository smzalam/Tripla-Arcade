import dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import { createServer } from 'node:http';

import createSocket from "./sockets/index.js";
import gamesRouter from './routes/games.js'
import authRouter from './routes/auth.js';
import { log } from 'node:console';
import cookieParser from 'cookie-parser';

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

// Cross Origin Resource Sharing
app.use(cors(
    {
        origin: allowedOrigins,
        // origin: (origin, callback) => {
        //     console.log('ORIGIN: ', origin)
        //     console.log(allowedOrigins.indexOf('http://127.0.0.1:3001'));
        //     allowedOrigins.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'))
        // },
        optionsSuccessStatus: 200
    }
))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// middleware for cookies
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.use('/games', gamesRouter)
app.use('/auth', authRouter)

server.listen(process.env.PORT, () => { console.log(`Server is running on port ${process.env.PORT}.`) })
