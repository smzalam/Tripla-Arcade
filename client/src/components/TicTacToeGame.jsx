/* eslint-disable react/prop-types */
import { useReducer, useState } from 'react'
import { newTicTacToeBoard } from './utility_funcs';
import { tttReducer } from './reducers';
import Board from './Board';
import { useChatContext } from 'stream-chat-react';

function TicTacToeGame({ channel }) {
    console.log(channel)
    const client = useChatContext()
    const players = Object.keys(channel.state.members)
    const NEXT_PLAYER = {
        'X': players[1],
        'O': players[0]
    }
    const NEXT_PLAYER_TEXT = {
        'start': player => `It is player ${channel.state.members[player].user.name}'s turn.`,
        'finish': () => null
    }
    const GAME_STATUS_TEXT = {
        start: () => null,
        finish: player => `Player ${channel.state.members[player].user.name} has won!`
    }
    const initialState = {
        board: newTicTacToeBoard(3, 3, () => ""),
        player: players[0],
        turn: 'X',
        status: 'start'
    }

    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [state, dispatch] = useReducer(tttReducer, initialState);
    const { board, player, turn, status } = state

    const handleClick = async (x, y) => {
        await channel.sendEvent({
            type: 'game-move',
            data: {
                x, y, player, turn
            }
        })
    }
    const reset = async () => {
        await channel.sendEvent({
            type: 'reset'
        })
    }

    channel.on((event) => {
        if (event.type == "game-move") {
            const { x, y } = event.data
            dispatch({ type: 'CLICK', payload: { x, y }, currentPlayer: event.user.id, changeTurn: 'true', players: NEXT_PLAYER, default: initialState })
            if (event.user.id !== client.client.userID) {
                console.log('event: ', event.user.id)
                console.log('client: ', client.client.userID)
                dispatch({ type: 'CLICK', payload: { x, y }, changeTurn: 'false', default: initialState })
            }
        } else if (event.type == "reset") {
            dispatch({ type: 'RESET', state: initialState })
        } else if (event.type == "user.watching.start" || event.type == "user.watching.stop") {
            setPlayersJoined(channel.state.watcher_count === 2);
        }
    })

    if (!playersJoined) {
        return (<div>Waiting for other player to join...</div>);
    }

    return (
        <div className="gameContainer">
            <div>{NEXT_PLAYER_TEXT[status](player)}{GAME_STATUS_TEXT[status](player)}</div>
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

export default TicTacToeGame    
