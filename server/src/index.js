import dotenv from 'dotenv';
import cors from 'cors';
import { StreamChat } from 'stream-chat';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

dotenv.config();

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
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userID);
        res.json({ token, userID, firstName, lastName, userName, hashedPassword });
    } catch (error) {
        res.json(error);
    }
})
app.post("/login", (req, res) => {
    const { userName, password } = req.body;

})

app.listen(3001, () => { console.log("Sever is running on port 3001.") })