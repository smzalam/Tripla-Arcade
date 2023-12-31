import express from 'express';
import {
    getGameDescription,
    getAllGameDescriptions,
    createGameDescription,
    updateGameDescription
} from '../controllers/gameListControllers.js'

const gamesRouter = express.Router();

gamesRouter.get('/all', async (req, res) => {
    res.status(200).json(await getAllGameDescriptions());
})
gamesRouter.get('/:game', async (req, res) => {
    res.status(200).json(await getGameDescription(req.params.game))
})

gamesRouter.post('/:game', async (req, res) => {
    res.status(204).json(await createGameDescription(req.params.game));
})

gamesRouter.put('/:game', async (req, res) => {
    res.status(204).json(await updateGameDescription(req.params.game))
})

export default gamesRouter;