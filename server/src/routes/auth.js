import express from 'express';
import {
    handleNewUser,
    handleLogin,
    handleRefreshToken,
    handleLogout
} from '../controllers/authControllers/index.js'

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const result = await handleNewUser(req.body.user, req.body.pwd);
    console.log(result)
    res.status(result.status).json(result.json)
    console.log(res)
})

authRouter.post('/login', async (req, res) => {
    const result = await handleLogin(req.body.user, req.body.pwd);
    console.log(result)
    res.cookie(result.cookie.jwt, result.cookie.refreshToken, result.cookie.options)
    res.status(result.status).json(result.json)
})

authRouter.get('/refresh', async (req, res) => {
    const result = await handleRefreshToken(req.cookies)
    res.status(result.status).json(result.json)
})

authRouter.get('/logout', async (req, res) => {
    const result = await handleLogout(req.cookies)
    res.clearCookie(result.cookie.jwt, result.cookie.options)
    res.status(result.status).json(result.json)
})

export default authRouter;