import express from 'express';
import {
    handleNewUser
} from '../controllers/authControllers/index.js'

const authRouter = express.Router();

authRouter.get('/register', async (req, res) => {
    const result = await handleNewUser(req.body.user, req.body.pwd);
    res.status(result.status).json(result.json)
})


export default authRouter;