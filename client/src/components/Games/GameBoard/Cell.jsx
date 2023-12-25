/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

function Cell({ cell, handleClick, game }) {
    const CELL_STYLE = {
        TicTacToe: 'h-24 w-24 xl:h-32 xl:w-32 rounded-md mr-1 mb-1 border-8 border-solid',
        Connect4: 'bg-background h-[75px] w-[75px] rounded-full'
    }
    const PLAYER_COLOR = {
        TicTacToe: cell => {
            if (cell === '') {
                return '#2a1e33'
            }
            return cell === 'X' ? '#581c87' : '#eab308'
        },
        Connect4: cell => {
            if (cell === '') {
                return 'bg-white'
            }
            return cell === 'X' ? 'bg-rose-600' : 'bg-yellow-500'
        }
    }

    const BORDER_COLOR = {
        TicTacToe: cell => {
            if (cell !== '') {
                return cell === 'X' ? 'border-[#a78bfa]' : 'border-[#fcd34d]'
            } else {
                return 'border-[#ffffff]'
            }
        },
        Connect4: cell => {
            if (cell === '') {
                return 'bg-white'
            }
            return cell === 'X' ? 'bg-rose-600' : 'bg-yellow-500'
        }
    }

    const CELL_VALUE = {
        TicTacToe: cell,
        Connect4: ''
    }
    const CELL_VALUE_COLOR = {
        TicTacToe: cell => {
            return cell === 'X' ? 'text-4xl text-text font-bold' : 'text-4xl text-text font-bold'
        },
        Connect4: cell => {
            if (cell === 'X') {
                return 'bg-white'
            }
            return cell === 'O' ? 'bg-rose-600' : 'bg-amber-400'
        }
    }



    console.log(game)
    console.log(CELL_STYLE[game]);
    console.log(PLAYER_COLOR[game](cell));
    console.log(CELL_VALUE_COLOR[game](cell));
    console.log(CELL_VALUE[game]);

    return (
        <motion.div
            whileHover={{
                scale: 1.1,
                // background: PLAYER_COLOR[game](cell),
                // borderColor: BORDER_COLOR[game](cell)
            }}
            className={`${CELL_STYLE[game]} bg-[${PLAYER_COLOR[game](cell)}] ${BORDER_COLOR[game](cell)} cursor-pointer flex place-items-center justify-center`}
            onClick={handleClick}
        >
            {/* <button className={`${PLAYER_COLOR[game](cell)} rounded-md w-full h-full`} type="button" onClick={handleClick}> */}
            <text className={`${CELL_VALUE_COLOR[game](cell)}`}>{CELL_VALUE[game]}</text>
            {/* </button> */}
        </motion.div>
    )
}

export default Cell
