import { useState } from "react"
import ReadyButton from './Games/ReadyButton'
// import { useGameContext } from "../../context/GameContext";
import IMAGES from "../assets/images/images";
import { motion } from 'framer-motion';

const WaitingScreen = ({ deactivateGame, room }) => {
    const [ready, setReady] = useState(false);
    // const { socket } = useGameContext();


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="bg-secondary rounded-lg flex flex-col justify-around items-center w-full h-full "
        >
            <motion.div
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: '0%' }}
                transition={{ delay: 0.5, duration: 0.5, type: 'spring', bounce: 0.45, stiffness: 50 }}
                className="bg-accent text-primary w-max px-10 h-1/4 rounded-lg place-self-center flex flex-row gap-10 justify-center items-center"
            >
                <div className=" text-4xl rounded-lg">
                    Room Code:
                </div>
                <div className="text-3xl">
                    {room}
                </div>
            </motion.div>
            {ready && <ReadyButton />}
            {!ready &&
                <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mb-20 text-background text-7xl"
                >
                    Waiting for Player 2 to join...
                </motion.div>
            }
            <motion.button
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className='hover:bg-primary active:bg-black w-1/4 rounded-lg flex flex-row justify-center place-items-center gap-4 text-primary hover:text-text font-bold text-3xl'
                onClick={deactivateGame}
            >
                <img
                    src={IMAGES.backIcon}
                    alt="Leaderboard"
                    className='max-w-iconSize grid justify-self-center place-self-center' />
                Exit
            </motion.button>
            {/* <button
                onClick={
                    () => {
                        socket.emit('clicked', 'hi')
                    }
                }
            >
                Click
            </button> */}
        </motion.div>
    )
}

export default WaitingScreen