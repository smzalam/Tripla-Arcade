/* eslint-disable react/prop-types */
import { useState } from 'react';
import IMAGES from '../../assets/images/images';
import AuthModal from '../../components/AuthModal';
import { useUserContext } from '../../context/AuthContext';
import JoinGame from './JoinGame';

function ChooseGame() {

    const [game, setGame] = useState(null);
    const [modal, setModal] = useState(false);
    const { isAuth } = useUserContext();

    return (
        <>
            {game && isAuth && <JoinGame game={game} ></JoinGame>}
            {!game &&
                <div className='grid grid-rows-5 row-span-5 w-screen h-full'>
                    <AuthModal modal={modal} setModal={setModal} />
                    <text className='text-5xl text-smoky pt-6 font-bold row-start-1 justify-self-center place-self-center'>Choose a game!</text>
                    <div className='row-start-3 row-span-2 grid grid-cols-3'>
                        <div className="h-fit max-w-sm flex flex-col rounded-lg overflow-hidden bg-white hover:bg-lavender shadow place-self-center justify-self-center">
                            <button
                                onClick={
                                    () => {
                                        if (isAuth) {
                                            setGame('TicTacToe')
                                        } else {
                                            setModal(true);
                                        }
                                    }
                                }
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
                                onClick={
                                    () => {
                                        if (isAuth) {
                                            setGame('Connect4');
                                        } else {
                                            setModal(true);
                                        }
                                    }
                                }
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
                                onClick={
                                    () => {
                                        if (isAuth) {
                                            setGame('MiniKahoot');
                                        } else {
                                            setModal(true);
                                        }
                                    }
                                }
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
            }
        </>
    )
}

export default ChooseGame
