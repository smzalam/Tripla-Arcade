import mongoose from 'mongoose';

const gameStateSchema = new mongoose.Schema({
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

const GameState = mongoose.models.GameState || mongoose.model('GameState', gameStateSchema);

export default GameState;