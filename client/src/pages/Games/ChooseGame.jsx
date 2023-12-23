/* eslint-disable react/prop-types */
import { useState } from 'react';
import Carousel from '../../components/Slider/Carousel';
import SliderItem from '../../components/Slider/SliderItem'
import JoinGame from './JoinGame';
import { useGameContext } from '../../context/GameContext';
import Game from './Game';
import { useSettingsContext } from '../../context/SettingsContext';
import { nanoid } from 'nanoid';
import { motion, AnimatePresence } from 'framer-motion';

function ChooseGame() {

    // const [game, setGame] = useState(null);
    // const [day, setDay] = useState(new Date().getMinutes())
    // useEffect(() => {
    //     let chosenGame = games[getRandomInt(2)]
    //     console.log(chosenGame)
    //     while (game === chosenGame) {
    //         chosenGame = games[getRandomInt(2)]
    //     }

    //     if (game !== chosenGame) {
    //         setGame(games[getRandomInt(4)])
    //         console.log('CURRENT DAY: ', day)
    //         console.log('CURRENT GAME: ', game)
    //     }
    // }, [day])

    const { setInGame } = useSettingsContext();
    const { socket, setRoom } = useGameContext();
    const [mode, setMode] = useState('choose');

    const games = [
        'QuicQuakQuad',
        'TicTacToe',
        'TypeRacer',
    ]

    const activateGame = (game) => {
        setInGame(game)

        const room = nanoid();
        setRoom(room);
        setMode('play')

        socket.emit('joinRoom', room)
    }

    const activateJoin = (game) => {
        setMode('join');
        setInGame(game)
    }

    const joinRoom = (room) => {
        setRoom(room);
        setMode('play')

        socket.emit('joinRoom', room)
    }

    const chooseGame = () => {
        setRoom('')
        setMode('choose')
        setInGame(false)
    }

    const deactivateGame = (room) => {
        socket.emit('leaveRoom', room)
        setMode('choose')
        setInGame(false)
        setRoom('')
    }

    return (
        <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ y: '-100vh'}}
            transition={{ duration: 0.5, ease: 'easeOut', type: 'spring', stiffness: 45 }}
            className='grid overflow-hidden'
        >
            <AnimatePresence mode={'wait'}>
                {mode === 'choose' &&
                    <Carousel key="carousel">
                        {
                            games.map(game => (
                                <SliderItem key={game} activateGame={activateGame} activateJoin={activateJoin} game={game} />
                            ))
                        }
                    </Carousel>
                }
                {mode === 'join' &&
                    <JoinGame key="joinGame" joinRoom={joinRoom} chooseGame={chooseGame} />
                }
                {mode === 'play' &&
                    <Game key="game" deactivateGame={deactivateGame} />
                }
            </AnimatePresence>
            {/* {game && <ActiveSlider game={game} />} */}
            {/* {game && <JoinGame game={game} ></JoinGame>} */}
            {/* {!game &&
                <div className='bg-yellow-600 bg-opacity-60 grid grid-rows-[0.3fr_1fr] w-full h-full p-2 border-8 border-black'>
                    <text className='text-3xl text-smoky font-bold row-start-1 justify-self-center place-self-center'>Choose a game!</text>
                    <div className='grid grid-cols-3'>
                        <div className="h-fit max-w-sm flex flex-col rounded-lg overflow-hidden bg-white hover:bg-lavender shadow place-self-center justify-self-center">
                            <button
                                // onClick={
                                //     () => {
                                //         if (isAuth) {
                                //             setGame('TicTacToe')
                                //         } else {
                                //             setModal(true);
                                //         }
                                //     }
                                // }
                                className='bg-cover hover:border-black'>
                                <img className="h-56 w-full object-cover"
                                    src={IMAGES.ttt}
                                    alt="" />

                                <div className="flex-1 px-6 pw-4">
                                    <div className="font-bold text-xl mb-2">Tic Tac Toe</div>
                                </div>
                            </button>
                        </div>
                        <div className="max-w-sm flex flex-col rounded-lg overflow-hidden bg-white hover:bg-lavender shadow place-self-center justify-self-center">
                            <button
                                // onClick={
                                //     () => {
                                //         if (isAuth) {
                                //             setGame('MiniKahoot');
                                //         } else {
                                //             setModal(true);
                                //         }
                                //     }
                                // }
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
                                // onClick={
                                //     () => {
                                //         if (isAuth) {
                                //             setGame('Connect4');
                                //         } else {
                                //             setModal(true);
                                //         }
                                //     }
                                // }
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
            } */}
        </motion.div>
    )
}

export default ChooseGame
