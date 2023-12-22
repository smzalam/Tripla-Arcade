/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import Board from '../../components/Board';
import ExitButton from '../../components/Buttons/ExitButton';
import ResetButton from '../../components/Buttons/ResetButton';

import { useGameContext } from '../../context/GameContext';
import { useSettingsContext } from '../../context/SettingsContext';

import { GAME_STATUS_TEXT, NEXT_PLAYER_TEXT } from '../../schemas/gameSchemas';

import WaitingScreen from './WaitingScreen';


function TicTacToeGame({ deactivateGame }) {
    const { socket, room, gameRoom } = useGameContext();
    const { inGame: game } = useSettingsContext();
    const [gameState, setGameState] = useState({});

    useEffect(() => {
        socket.on('roomFull', (initialGameState) => {
            socket.emit('gameStart', gameRoom.current)
        })

        socket.on('gameDisconnect', gameState => {
            setGameState(gameState);
            deactivateGame();
        })

        socket.on('gameStartState', (initialGameState) => {
            setGameState(initialGameState)
        })

        socket.on('playerJoin', (updatedGameState) => {
            setGameState(updatedGameState);
        })

        socket.on('playerLeave', (updatedGameState) => {
            setGameState(updatedGameState);
        })

        socket.on('gameEnd', (updatedGameState) => {
            setGameState(updatedGameState);
        })

        socket.on('resolvedGameMove', (updatedGameState) => {
            setGameState(updatedGameState);
        })

        socket.on('resetGameBoard', (updatedGameState) => {
            setGameState(updatedGameState);
        })

        return () => {
            socket.off('roomFull', (initialGameState) => {
                socket.emit('gameStart', gameRoom.current)
            })
    
            socket.off('gameDisconnect', gameState => {
                setGameState(gameState);
                deactivateGame();
            })
    
            socket.off('gameStartState', (initialGameState) => {
                setGameState(initialGameState)
            })
    
            socket.off('playerJoin', (updatedGameState) => {
                setGameState(updatedGameState);
            })
    
            socket.off('playerLeave', (updatedGameState) => {
                setGameState(updatedGameState);
            })
    
            socket.off('gameEnd', (updatedGameState) => {
                setGameState(updatedGameState);
            })
    
            socket.off('resolvedGameMove', (updatedGameState) => {
                setGameState(updatedGameState);
            })
    
            socket.off('resetGameBoard', (updatedGameState) => {
                setGameState(updatedGameState);
            })
        }
    })

    const { playersJoined, board, currentPlayer, status } = gameState

    const gameMove = (x, y) => {
        socket.emit('gameMove', gameRoom.current, {x, y, game})
    }

    const reset = () => {
        socket.emit('gameReset', gameRoom.current, { game })
    }


    return (
        <>
            {!playersJoined && <WaitingScreen deactivateGame={() => { deactivateGame(gameRoom.current) }} room={room} />}
            {playersJoined && <div className='bg-background text-9xl text-text'>
                <div className='flex flex-col justify-center h-full gap-10'>
                    <div className='absolute xl:top-[5%] flex flex-row'>
                        <ExitButton display={(status !== 'finish') ? 'grid' : 'grid'} deactivateGame={() => { deactivateGame(gameRoom.current) }} />
                    </div>
                    <div className='flex flex-row justify-center'>
                        <div className='text-3xl text-text font-bold'>
                            {NEXT_PLAYER_TEXT[status](currentPlayer)}
                            {GAME_STATUS_TEXT[status](currentPlayer)}
                        </div>
                    </div>
                    <div className='flex flex-col place-self-center'>
                        <Board board={board} handleClick={gameMove} game={game} />
                        <ResetButton reset={reset} />
                    </div>
                </div>
            </div>}
        </>
    );
}

export default TicTacToeGame    
