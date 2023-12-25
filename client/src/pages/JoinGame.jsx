/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import IMAGES from '../assets/images/images';
import { motion } from 'framer-motion';

function JoinGame({ joinRoom, chooseGame }) {

    const [room, setRoom] = useState('');
    const gameRoom = useRef('')

    useEffect(() => {
        gameRoom.current = room
    }, [room])

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center bg-secondary rounded-lg items-center"
            >
                <div className='overflow-hidden'>
                    <motion.h4
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="place-self-center text-3xl text-primary font-bold"
                    >
                        Enter the room code of the game you want to join!
                    </motion.h4>
                </div>
                <div className="place-self-center flex flex-row w-full h-2/4 justify-center items-center gap-10">
                    <motion.input
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        placeholder='Room code...'
                        onChange={
                            (event) => {
                                setRoom(event.target.value)
                            }
                        }
                        className="bg-white rounded-lg  p-3 w-1/2 h-1/4" />
                    <motion.button
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        onClick={() => { joinRoom(gameRoom.current) }}
                        className="bg-yellow-500 hover:bg-primary hover:text-text active:bg-black active:text-text rounded-lg w-1/4 h-1/4 text-2xl">
                        Join Game
                    </motion.button>
                </div>
                <motion.button
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className='hover:bg-primary active:bg-black w-1/4 rounded-lg flex flex-row justify-center place-items-center gap-4 text-primary hover:text-text font-bold text-3xl'
                    onClick={chooseGame}
                >
                    <img
                        src={IMAGES.backIcon}
                        alt="Leaderboard"
                        className='max-w-iconSize grid justify-self-center place-self-center' />
                    Exit
                </motion.button>
            </motion.div >
        </>
    );
}

export default JoinGame
