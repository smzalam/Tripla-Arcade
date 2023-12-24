import dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';

import { createServer } from 'node:http';

import createSocket from "./sockets/index.js";

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

server.listen(process.env.PORT, () => { console.log(`Server is running on port ${process.env.POR}.`) })
