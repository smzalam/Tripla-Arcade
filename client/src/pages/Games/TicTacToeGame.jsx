/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

import Board from '../../components/Board';
import ExitButton from '../../components/Buttons/ExitButton';
import ResetButton from '../../components/Buttons/ResetButton';

import { useGameContext } from '../../context/GameContext';
import { useSettingsContext } from '../../context/SettingsContext';

import { GAME_STATUS_TEXT, NEXT_PLAYER_TEXT } from '../../schemas/gameSchemas';

import WaitingScreen from './WaitingScreen';
import { motion, AnimatePresence } from 'framer-motion';


function TicTacToeGame({ deactivateGame }) {
    const { socket, room, gameRoom } = useGameContext();
    const { inGame: game } = useSettingsContext();
    const [gameState, setGameState] = useState({});
    const constraintsRef = useRef(null);
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
            console.log('PLAYER LEAVE GAME STATE CHECK THIS FOR DISCONNECT : ', updatedGameState);
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

        socket.on('socketDisconnect', () => {
            console.log('SOCKET DISCONNECT DONE HERE!!!!!!!!!!!!!!!!!!!!!!!!!')
            socket.emit('playerDisconnect', gameRoom.current)
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
        socket.emit('gameMove', gameRoom.current, { x, y, game })
    }

    const reset = () => {
        socket.emit('gameReset', gameRoom.current, { game })
    }


    return (
        <>
            <AnimatePresence mode={'wait'}>
                {!playersJoined && <WaitingScreen key={'waitingScreen'} deactivateGame={() => { deactivateGame(gameRoom.current) }} room={room} />}
                {playersJoined &&
                    <motion.div ref={constraintsRef}
                        key={'tttGame'}
                        className='bg-stone-700 text-9xl h-full text-text'
                    >
                        <div className='flex flex-col justify-center h-full gap-10'>
                            <motion.div
                                drag
                                dragConstraints={constraintsRef}
                                initial={{ x: '-100vw' }}
                                animate={{ x: '0%' }}
                                transition={{ delay: 2, duration: 1, type: 'spring', stiffness: 80, bounce: 0.6 }}
                                className='absolute xl:top-[5%] flex flex-row place-items-cetner justify-center overflow-hidden'
                            >
                                <ExitButton display={(status !== 'finish') ? 'grey' : 'grid'} deactivateGame={() => { deactivateGame(gameRoom.current) }} />
                            </motion.div>
                            <motion.div
                                drag
                                dragConstraints={constraintsRef}
                                // initial={{ opacity: 0 }}
                                // animate={{ opacity: 1 }}
                                // transition={{ delay: 0.5, duration: 0.5 }}
                                className='flex flex-row justify-center text-3xl text-text font-bold overflow-hidden'
                            >
                                <div>
                                    {NEXT_PLAYER_TEXT[status](currentPlayer)}
                                    {GAME_STATUS_TEXT[status](currentPlayer)}
                                </div>
                            </motion.div>
                            <motion.div
                                layout
                                drag
                                dragConstraints={constraintsRef}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className='flex flex-col place-self-center overflow-hidden'
                            >
                                <Board board={board} handleClick={gameMove} game={game} />
                            </motion.div>
                            <motion.div
                                drag
                                dragConstraints={constraintsRef}
                                initial={{ x: '100vw' }}
                                animate={{ x: '0%' }}
                                transition={{ delay: 1, duration: 1, type: 'spring', stiffness: 80, bounce: 0.6 }}
                                className='flex flex-row place-self-center justify-center place-items-center gap-4 overflow-hidden'
                            >
                                <ResetButton reset={reset} />
                            </motion.div>
                        </div>
                    </motion.div>}
            </AnimatePresence>
        </>
    );
}

export default TicTacToeGame    
