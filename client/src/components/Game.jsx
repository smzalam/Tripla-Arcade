/* eslint-disable react/prop-types */
import { useReducer, useState } from 'react'
import { newTicTacToeBoard } from './utility_funcs';
import { tttReducer } from './reducers';
import Board from './Board';
import { useChatContext } from 'stream-chat-react';

function Game({ channel }) {

    const client = useChatContext()
    const initialState = {
        board: newTicTacToeBoard(3, 3, () => ""),
        player: 'X',
        turn: 'X'
    }
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [state, dispatch] = useReducer(tttReducer, initialState);
    const { board, player } = state

    channel.on("user.watching.start", () => {
        setPlayersJoined(channel.state.watcher_count === 2);
    });
    channel.on("user.watching.stop", () => {
        setPlayersJoined(channel.state.watcher_count === 2);
    });
    if (!playersJoined) {
        // dispatch({ type: 'RESET' })
        return (<div>Waiting for other player to join...</div>);
    }

    const handleClick = async (x, y) => {
        dispatch({ type: 'CLICK', payload: { x, y } })
        await channel.sendEvent({
            type: 'game-move',
            data: {
                x, y, player
            }
        })
    }

    channel.on((event) => {
        if (event.type == "game-move" && event.user.id !== client.userID) {
            const { x, y, player } = event.data
            dispatch({ type: 'CLICK', payload: { x, y }, player: player })
        } else if (event.type == "reset") {
            dispatch({ type: 'RESET', state: initialState })

        }
    })

    return (
        <div className="gameContainer">
            <Board board={board} handleClick={handleClick} />
            <button
                onClick={async () => {
                    await channel.sendEvent({
                        type: 'reset'
                    })
                    dispatch({ type: 'RESET', state: initialState })
                }
                }>
                Reset
            </button>
            {/* CHAT */}
            {/* LEAVE GAME BUTTON */}
        </div>
    );
}

export default Game
