import { useEffect, useState } from "react"
import ReadyButton from './ReadyButton'
// import { useGameContext } from "../../context/GameContext";
import IMAGES from "../../assets/images/images";
import { nanoid } from 'nanoid';

const WaitingScreen = ({ deactivateGame }) => {
    const [ready, setReady] = useState(false);
    const [room, setRoom] = useState('');
    // const { socket } = useGameContext();
    useEffect(() => {
        const room = nanoid();
        setRoom(room);
        // socket.emit('joinRoom', room)
    }, [])

    return (
        <div className="bg-secondary rounded-lg flex flex-col justify-around items-center w-full h-full ">
            <div className="bg-accent text-primary w-max px-10 h-1/4 rounded-lg place-self-center flex flex-row gap-10 justify-center items-center">
                <div className=" text-4xl rounded-lg">
                    Room Code:
                </div>
                <div className="text-2xl">
                    {room}
                </div>
            </div>
            {ready && <ReadyButton />}
            {!ready &&
                <div className="mb-20 text-background text-7xl">
                    Waiting for Player 2 to join...
                </div>
            }
            <button
                className='hover:bg-primary active:bg-black w-1/4 rounded-lg grid'
                onClick={deactivateGame}
            >
                <img
                    src={IMAGES.backIcon}
                    alt="Leaderboard"
                    className='max-w-iconSize grid justify-self-center place-self-center' />
            </button>
            {/* <button
                onClick={
                    () => {
                        socket.emit('clicked', 'hi')
                    }
                }
            >
                Click
            </button> */}
        </div>
    )
}

export default WaitingScreen