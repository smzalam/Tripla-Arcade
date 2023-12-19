/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Board from '../../components/Board';
import ExitButton from '../../components/Buttons/ExitButton';
// import ResetButton from '../../components/Buttons/ResetButton';
import WaitingScreen from './WaitingScreen'
import { useGameContext } from '../../context/GameContext';
import { useSettingsContext } from '../../context/SettingsContext';
// import tttReducer from '../../reducers/tttReducer';
import { GAME_STATUS_TEXT, NEXT_PLAYER_TEXT, getInitialGameState } from '../../schemas/gameSchemas';


function TicTacToeGame({ deactivateGame, room }) {

    const { socket } = useGameContext();
    const { inGame: game } = useSettingsContext();
    const [playersJoined, setPlayersJoined] = useState(false);
    const [players, setPlayers] = useState([]);
    const initialState = getInitialGameState(3, 3, () => "", players)


    useEffect(() => {
        socket.on('roomFull', () => {
            setPlayersJoined(true);
        })

        socket.on('playerJoin', (playerIds) => {
            const newPlayers = playerIds
            setPlayers(newPlayers)
            console.log(newPlayers)
            console.log(players)
        })

        socket.on('playerLeave', () => {
            setPlayersJoined(false);
        })

        return () => {
            socket.off('roomFull', () => {
                setPlayersJoined(true);
            })
            socket.off('playerLeave', () => {
                setPlayersJoined(false);
            })
        }
    })
    // const [state, dispatch] = useReducer(tttReducer, initialState);
    const { board, player, turn, status } = initialState

    // const gameMove = async (x, y) => {
    //     await channel.sendEvent({
    //         type: 'game-move',
    //         data: {
    //             x, y, player, turn
    //         }
    //     })
    // }

    const gameMove = (x, y) => {
        console.log(x, y)
    }

    // const reset = async () => {
    //     await channel.sendEvent({
    //         type: 'reset'
    //     })
    // }

    // const stopWatching = async () => {
    //     await channel.stopWatching();
    //     setChannel(null);
    // }

    // channel.on((event) => {
    //     if (event.type == "game-move") {
    //         const { x, y } = event.data
    //         dispatch({
    //             type: 'CLICK',
    //             payload: { x, y },
    //             currentPlayer: event.user.id,
    //             changeTurn: 'true',
    //             default: initialState
    //         })

    //         if (event.user.id !== client.client.userID) {
    //             dispatch({
    //                 type: 'CLICK',
    //                 payload: { x, y },
    //                 changeTurn: 'false',
    //                 default: initialState
    //             })
    //         }
    //     } else if (event.type == "reset") {
    //         dispatch({
    //             type: 'RESET',
    //             state: initialState
    //         })
    //     } else if (event.type == "user.watching.start" || event.type == "user.watching.stop") {
    //         setPlayersJoined(channel.state.watcher_count === 2);
    //     }
    // })

    return (
        <>
            {!playersJoined && <WaitingScreen deactivateGame={deactivateGame} room={room} />}
            {playersJoined && <div className='bg-background text-9xl text-text'>
                <div className='flex flex-col justify-center h-full gap-10'>
                    <div className='absolute top-10 flex flex-row'>
                        <ExitButton display={(status !== 'finish') ? 'grid' : 'grid'} deactivateGame={deactivateGame} />
                    </div>
                    <div className='flex flex-row justify-center'>
                        <div className='text-3xl text-yellow-500 font-bold'>
                            {NEXT_PLAYER_TEXT[status](player)}
                            {GAME_STATUS_TEXT[status](player)}
                        </div>
                    </div>
                    <div className='col-start-2 place-self-center'>
                        <Board board={board} handleClick={gameMove} game={game} />
                    </div>
                    {/* <button className='text-text bg-primary' onClick={deactivateGame}>CLICK ME</button> */}
                </div>
            </div>}
            {/* {playersJoined &&
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
            {/* </div> */}
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
            {/* </div > */}
            {/* } */}
        </>
    );
}

export default TicTacToeGame    
