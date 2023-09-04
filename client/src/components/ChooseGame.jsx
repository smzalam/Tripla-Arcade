import { useState } from 'react'
import JoinGame from './JoinGame'

function ChooseGame() {

    const [game, setGame] = useState(null)

    return (
        <>
            {game ? (
                <>
                    <JoinGame game={game}></JoinGame>
                </>
            ) : (
                <div>
                    <button onClick={() => setGame('TicTacToe')}>TicTacToe</button>
                    <button onClick={() => setGame('Connect4')}>Connect4</button>
                    <button onClick={() => setGame('MiniKahoot')}>MiniKahoot</button>
                </div>
            )}
        </>
    )
}

export default ChooseGame
