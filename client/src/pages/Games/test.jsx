/* eslint-disable react/prop-types */
import { useReducer, useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import Board from '../../components/Board';
import c4Reducer from '../../reducers/c4Reducer';
import { getInitialGameState, NEXT_PLAYER_TEXT, GAME_STATUS_TEXT } from '../../schemas/gameSchemas';
import WaitingScreen from '../../components/Game/WaitingScreen';
import ExitButton from '../../components/Buttons/ExitButton';
import ResetButton from '../../components/Buttons/ResetButton';

function Connect4Game({ channel, setChannel, game }) {
    const client = useChatContext()
    const players = Object.keys(channel.state.members)
    const initialState = getInitialGameState(6, 7, () => "", players)

    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [state, dispatch] = useReducer(c4Reducer, initialState);
    const { board, player, turn, status } = state

    const gameMove = async (x, y) => {
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

    const stopWatching = async () => {
        await channel.stopWatching();
        setChannel(null);
    }

    console.log(channel)

    channel.on((event) => {
        if (event.type == "game-move") {
            const { x, y } = event.data
            dispatch({ type: 'CLICK', payload: { x }, currentPlayer: event.user.id, changeTurn: 'true', default: initialState })
            if (event.user.id !== client.client.userID) {
                dispatch({ type: 'CLICK', payload: { x }, currentPlayer: event.user.id, changeTurn: 'true', default: initialState })
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
        <>
            {!playersJoined && <WaitingScreen stopWatching={stopWatching} />}
            {playersJoined &&
                <div className="grid grid-rows-5 w-screen h-[82.5vh]">
                <div className='row-start-1 grid grid-cols-3 w-screen h-full'>
                    <div className='grid grid-cols-2 w-fit'>
                        <ExitButton display={(status !== 'finish') ? 'hidden' : 'grid'} stopWatching={stopWatching} />
                    </div>
                    <div className='col-start-2 place-self-center text-3xl text-yellow-500 font-bold'>
                        {NEXT_PLAYER_TEXT[status](channel.state.members[player].user.name)}
                        {GAME_STATUS_TEXT[status](channel.state.members[player].user.name)}
                    </div>
                </div>
                <div className='row-start-2 grid grid-cols-3 w-screen h-full'>
                    <div className='col-start-2 place-self-center'>
                        <Board board={board} handleClick={gameMove} game={game} />
                        <div className='grid grid-cols-2'>
                            <ResetButton reset={reset} />
                        </div>

                    </div>
                    {/* // <div className='col-start-3 place-self-center w-4/5 h-full'>
        //             {game_log}
        //         </div>
        // <div>
        //             <Window>
        //                 <MessageList
        //                     disableDateSeparator
        //                     closeReactionSelectorOnClick
        //                     hideDeletedMessages
        //                     messageActions={["react"]}
        //                 />
        //                 <MessageInput noFiles={enable} />
        //             </Window>
        //         </div> */}
                </div>
                {/* // <div className='overflow-hidden row-start-4 place-self-center grid grid-cols-4 w-screen h-full'>

    //             <button
    //                 onClick={
    //                     async () => {
    //                         await channel.stopWatching();
    //                         setChannel(null);
    //                     }
    //                 }
    //                 className={`${exitButtonDisplay}`}
    //             >Exit</button>
    //         </div> */}
            </div >
        }
        </>
    );
}

export default Connect4Game
