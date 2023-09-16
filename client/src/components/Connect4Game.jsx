/* eslint-disable react/prop-types */
import { useReducer, useState } from 'react'
import { newBoard } from './utility_funcs';
import { c4Reducer } from './reducers';
import Board from './Board';
import { useChatContext, Window, MessageList, MessageInput } from 'stream-chat-react';

function Connect4Game({ channel, setChannel, game }) {
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
        board: newBoard(6, 7, () => ""),
        player: players[0],
        turn: 'X',
        status: 'start'
    }

    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [state, dispatch] = useReducer(c4Reducer, initialState);
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
            let emptyCellPlace = ''
            console.log(board)
            for (var i = 5; i >= 0; i--) {
                if (board[i][x] === '') {
                    emptyCellPlace = i
                    break;
                }
            }
            console.log('x: ', x, ' & e: ', emptyCellPlace)
            dispatch({ type: 'CLICK', payload: { x, emptyCellPlace }, currentPlayer: event.user.id, changeTurn: 'true', players: NEXT_PLAYER, default: initialState })
            if (event.user.id !== client.client.userID) {
                dispatch({ type: 'CLICK', payload: { x, emptyCellPlace }, currentPlayer: event.user.id, changeTurn: 'true', players: NEXT_PLAYER, default: initialState })
            }
        } else if (event.type == "reset") {
            dispatch({ type: 'RESET', state: initialState })
        } else if (event.type == "user.watching.start" || event.type == "user.watching.stop") {
            setPlayersJoined(channel.state.watcher_count === 2);
        }
    })

    if (!playersJoined) {
        return (
            <>
                <div>Waiting for other player to join...</div>
                <button onClick={async () => {
                    await channel.stopWatching();
                    setChannel(null);
                }}>Exit</button>
            </>
        );
    }

    return (
        <div className="gameContainer">
            <div>{NEXT_PLAYER_TEXT[status](player)}{GAME_STATUS_TEXT[status](player)}</div>
            <Board board={board} handleClick={handleClick} game={game} />
            <button
                onClick={() => { reset() }
                }>
                Reset
            </button>
            {/* <Window>
                <MessageList disableDateSeparator />
                <MessageInput noFiles />
            </Window> */}
            <button onClick={async () => {
                await channel.stopWatching();
                setChannel(null);
            }}>Exit</button>
        </div>
    );
}

export default Connect4Game
