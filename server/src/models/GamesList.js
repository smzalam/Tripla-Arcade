import mongoose from 'mongoose';

const gameListSchema = new mongoose.Schema({
    game: String,
    category: String,
    type: String,
    guide: {
        objective: String,
        gameRules: [String],
        howToPlay: [String],
        winningPatterns: {
            type: Map,
            of: [String]
        },
        tips: [String]
    }
})

const GamesList = mongoose.models.Games || mongoose.model('GamesList', gameListSchema);

export default GamesList;