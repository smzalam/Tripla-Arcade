/* eslint-disable react/prop-types */
import { useState } from 'react'
import JoinGame from './JoinGame'
import IMAGES from '../images/images'

function ChooseGame({ setShowNav }) {

    const [game, setGame] = useState(null)

    return (
        <>
            {game ? (
                <>
                    <JoinGame game={game} setShowNav={setShowNav} ></JoinGame>
                </>
            ) : (
                <div className='grid grid-rows-5 row-span-5 w-screen h-full'>
                    <text className='text-5xl row-start-1 justify-self-center place-self-center'>Choose a game!</text>
                    <div className='row-start-3 row-span-2 grid grid-cols-3'>
                        <div className="h-fit max-w-sm flex flex-col rounded-lg overflow-hidden bg-white hover:bg-lavender shadow place-self-center justify-self-center">
                            <button
                                onClick={() => setGame('TicTacToe')}
                                className='bg-cover hover:border-black'>
                                <img className="h-56 w-full object-cover"
                                    src={IMAGES.ttt}
                                    alt="" />

                                <div className="flex-1 px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Tic Tac Toe</div>
                                </div>
                            </button>
                        </div>
                        <div className="max-w-sm flex flex-col rounded-lg overflow-hidden bg-white hover:bg-lavender shadow place-self-center justify-self-center">
                            <button
                                onClick={() => setGame('Connect4')}
                                className='bg-cover hover:border-black'>
                                <img className="h-56 w-full object-cover"
                                    src={IMAGES.ultttt}
                                    alt="" />

                                <div className="flex-1 px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Ultimate Tic Tac Toe</div>
                                </div>
                            </button>
                        </div>
                        <div className="max-w-sm flex flex-col rounded-lg overflow-hidden bg-white hover:bg-lavender shadow place-self-center justify-self-center">
                            <button
                                onClick={() => setGame('MiniKahoot')}
                                className='bg-cover hover:border-black'>
                                <img className="h-56 w-full object-cover"
                                    src={IMAGES.connect4}
                                    alt="" />

                                <div className="flex-1 px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Connect 4</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div >
            )
            }
        </>
    )
}

export default ChooseGame
