import express from "express"
import dotenv from 'dotenv';
import cors from 'cors';
import { StreamChat } from 'stream-chat';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.apiKey;
const apiSecret = process.env.apiSecret;

const serverClient = new StreamChat.getInstance(apiKey, apiSecret);

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, userName, password } = req.body;
        const userID = uuidv4();
        const token = serverClient.createToken(userID);
        const hashedPassword = await bcrypt.hash(password, 10);
        res.json({ token, userID, firstName, lastName, userName, hashedPassword });
    } catch (error) {
        res.json(error);
    }
})

app.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const { users } = await serverClient.queryUsers({ name: userName });
        if (users.length == 0) return res.json({ message: "User not found." });
        const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);
        const token = serverClient.createToken(users[0].id)
        if (passwordMatch) {
            res.json({ token, firstName: users[0].firstName, lastName: users[0].lastName, userName: users[0].name, userID: users[0].id })
        }
    } catch (error) {
        res.json(error)
    }
})

app.listen(3001, () => { console.log("Sever is running on port 3001.") })