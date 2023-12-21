import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    room: {
        type: String,
        default: ''
    },
    board: [[String], [String], [String]],
    players: [],
    turn: String,
    status: String,
    nextPlayer: {
        type: {
            X: String,
            O: String
        },
        default: {
            X: '',
            O: ''
        }
    },
    currentPlayer: {
        type: String,
        default: ''
    },
    playersJoined: {
        type: Boolean,
        default: false
    }
})

const Game = mongoose.models.Game || mongoose.model('Game', gameSchema);

export default Game;