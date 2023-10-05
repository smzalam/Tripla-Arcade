/* eslint-disable react/prop-types */
import { useReducer, useState } from 'react'
import { newBoard } from './utility_funcs';
import { tttReducer } from './reducers';
import Board from './Board';
import IMAGES from '../images/images'
import { useChatContext, Window, MessageList, MessageInput } from 'stream-chat-react';

function TicTacToeGame({ channel, setChannel, game }) {
    // const enable = true;
    // const disable = false;
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
        board: newBoard(3, 3, () => ""),
        player: players[0],
        turn: 'X',
        status: 'start',
        // addLog: 'true'
    }

    const game_log = [];

    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [state, dispatch] = useReducer(tttReducer, initialState);
    const { board, player, turn, status, addLog } = state

    const handleClick = async (x, y) => {
        await channel.sendEvent({
            type: 'game-move',
            data: {
                x, y, player, turn
            }
        })
    }
    // const add_to_log = async (player, x, y) => {
    // }
    const reset = async () => {
        await channel.sendEvent({
            type: 'reset'
        })
    }


    channel.on((event) => {
        if (event.type == "game-move") {
            console.log(addLog)
            const { x, y } = event.data
            dispatch({ type: 'CLICK', payload: { x, y }, currentPlayer: event.user.id, changeTurn: 'true', players: NEXT_PLAYER, default: initialState })
            if (event.user.id !== client.client.userID) {
                console.log('event: ', event.user.id)
                console.log('client: ', client.client.userID)
                dispatch({ type: 'CLICK', payload: { x, y }, changeTurn: 'false', default: initialState })
            }
            // console.log('ttt', addLog)
            // if (addLog === 'true') {
            //     game_log.push([player, x, y])
            // }
        } else if (event.type == "reset") {
            dispatch({ type: 'RESET', state: initialState })
        } else if (event.type == "user.watching.start" || event.type == "user.watching.stop") {
            setPlayersJoined(channel.state.watcher_count === 2);
        }
    })

    console.log(game_log)


    let exitButtonDisplay = 'grid'
    if (status !== 'finish') {
        exitButtonDisplay = 'hidden'
    }

    if (!playersJoined) {
        return (
            <div className='grid grid-rows-4 w-screen h-[82.5vh]'>
                <div className='pt-24 place-self-center justify-self-center row-span-2 text-4xl text-smoky font-bold'>
                    Waiting for the other player to join...
                </div>
                <button
                    className='hover:bg-lavender active:bg-black grid w-1/4 rounded-md place-self-center'
                    onClick={
                        async () => {
                            await channel.stopWatching();
                            setChannel(null);
                        }
                    }
                >
                    <img
                        src={IMAGES.backIcon}
                        alt="Leaderboard"
                        className='max-w-iconSize grid justify-self-center place-self-center' />
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-rows-5 w-screen h-[82.5vh]">
            <div className='row-start-1 grid grid-cols-3 w-screen h-full'>
                <div className='grid grid-cols-2 w-fit'>
                    <text className={`${exitButtonDisplay} place-self-center justify-self-center ml-6 text-3xl text-yellow-500`}>Back</text>
                    <button
                        className={`hover:bg-lavender hover:rounded-md  active:bg-black ${exitButtonDisplay} justify-self-start self-center`}
                        onClick={
                            async () => {
                                await channel.stopWatching();
                                setChannel(null);
                            }
                        }
                    >
                        <img
                            src={IMAGES.backIcon}
                            alt="Leaderboard"
                            className='max-w-iconSize grid justify-self-center place-self-center' />
                    </button>
                </div>
                <div className='col-start-2 place-self-center text-3xl text-yellow-500 font-bold'>
                    {NEXT_PLAYER_TEXT[status](player)}{GAME_STATUS_TEXT[status](player)}
                </div>
            </div>
            <div className='row-start-2 grid grid-cols-3 w-screen h-full'>
                <div className='col-start-2 place-self-center'>
                    <Board board={board} handleClick={handleClick} game={game} />
                    <div className='grid grid-cols-2'>
                        <text className='place-self-center justify-self-center mt-7 ml-6 text-3xl text-yellow-500'>Reset</text>
                        <button
                            className='hover:bg-black hover:rounded-md active:bg-black grid w-full h-full mt-5'
                            onClick={() => { reset() }}
                        >
                            <img
                                src={IMAGES.resetIcon}
                                alt="Leaderboard"
                                className='max-w-iconSize grid justify-self-center place-self-center' />
                        </button>
                    </div>

                </div>
                <div className='col-start-3 place-self-center w-4/5 h-full'>
                    {game_log}
                </div>
                {/* <div>
                    <Window>
                        <MessageList
                            disableDateSeparator
                            closeReactionSelectorOnClick
                            hideDeletedMessages
                            messageActions={["react"]}
                        />
                        <MessageInput noFiles={enable} />
                    </Window>
                </div> */}
            </div>
            {/* <div className='overflow-hidden row-start-4 place-self-center grid grid-cols-4 w-screen h-full'>

                <button
                    onClick={
                        async () => {
                            await channel.stopWatching();
                            setChannel(null);
                        }
                    }
                    className={`${exitButtonDisplay}`}
                >Exit</button>
            </div> */}
        </div >
    );
}

export default TicTacToeGame    
