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
    // const watch = channel.state.watchers !== {} ? channel.state.watchers : channel.state.watchers[0].id
    // console.log(watch)

    const handleClick = async (x, y) => {
        dispatch({ type: 'CLICK', payload: { x, y } })
        await channel.sendEvent({
            type: 'game-move',
            data: {
                x, y, player
            }
        })
    }

    const reset = async () => {
        await channel.sendEvent({
            type: 'reset'
        })
        dispatch({ type: 'RESET', state: initialState })
    }

    channel.on("user.watching.start", () => {
        setPlayersJoined(channel.state.watcher_count === 2);
    });
    channel.on("user.watching.stop", () => {
        setPlayersJoined(channel.state.watcher_count === 2);
        if (!playersJoined) {
            reset()
        }
    });

    channel.on((event) => {
        if (event.type == "game-move" && event.user.id !== client.userID) {
            const { x, y, player } = event.data
            dispatch({ type: 'CLICK', payload: { x, y }, player: player })
        } else if (event.type == "reset") {
            dispatch({ type: 'RESET', state: initialState })

        }
    })

    if (!playersJoined) {
        return (<div>Waiting for other player to join...</div>);
    }

    return (
        <div className="gameContainer">
            <Board board={board} handleClick={handleClick} />
            <button
                onClick={() => { reset() }
                }>
                Reset
            </button>
            {/* CHAT */}
            {/* LEAVE GAME BUTTON */}
        </div>
    );
}

export default Game
