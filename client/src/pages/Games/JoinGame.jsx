/* eslint-disable react/prop-types */
import { useState } from 'react';
import IMAGES from '../../assets/images/images';

function JoinGame({ joinRoom, deactivateGame }) {

    const [room, setRoom] = useState('');

    return (
        <>
            <div className="flex flex-col justify-center bg-secondary rounded-lg items-center">
                <h4 className="place-self-center text-2xl text-primary font-bold">
                    Enter the room code of the game you want to join!
                </h4>
                <div className="place-self-center flex flex-row w-full h-2/4 justify-center items-center gap-10">
                    <input
                        placeholder='Room code...'
                        onChange={
                            (event) => {
                                setRoom(event.target.value)
                            }
                        }
                        className="bg-white rounded-lg  p-3 w-1/2 h-1/4" />
                    <button
                        onClick={() => { joinRoom(room) }}
                        className="bg-yellow-500 hover:bg-primary hover:text-text active:bg-black active:text-text rounded-lg w-1/4 h-1/4 text-2xl">
                        Join Game
                    </button>
                </div>

                <button
                    className='hover:bg-primary active:bg-black w-1/4 rounded-lg grid'
                    onClick={deactivateGame}
                >
                    <img
                        src={IMAGES.backIcon}
                        alt="Leaderboard"
                        className='max-w-iconSize grid justify-self-center place-self-center' />
                </button>
            </div >
        </>
    );
}

export default JoinGame
