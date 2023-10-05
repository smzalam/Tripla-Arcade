/* eslint-disable react/prop-types */

function Cell({ cell, handleClick, game }) {

    const CELL_STYLE = {
        TicTacToe: 'bg-white h-[75px] w-[75px] rounded-md m-1',
        Connect4: 'bg-white h-[75px] w-[75px] rounded-full'
    }
    const PLAYER_COLOR = {
        TicTacToe: cell => {
            if (cell === '') {
                return 'bg-white'
            }
            return cell === 'X' ? 'bg-purple-900' : 'bg-amber-400'
        },
        Connect4: cell => {
            if (cell === '') {
                return 'bg-white'
            }
            return cell === 'X' ? 'bg-rose-600' : 'bg-amber-400'
        }
    }
    const CELL_VALUE = {
        TicTacToe: cell,
        Connect4: ''
    }
    const CELL_VALUE_COLOR = {
        TicTacToe: cell => {
            return cell === 'X' ? 'text-3xl text-white font-bold' : 'text-3xl text-white font-bold'
        },
        Connect4: cell => {
            if (cell === 'X') {
                return 'bg-white'
            }
            return cell === 'O' ? 'bg-rose-600' : 'bg-amber-400'
        }
    }


    return (
        <div className={`${CELL_STYLE[game]}`}>
            <button className={`${PLAYER_COLOR[game](cell)} rounded-md w-full h-full`} type="button" onClick={handleClick}>
                <text className={`${CELL_VALUE_COLOR[game](cell)}`}>{CELL_VALUE[game]}</text>
            </button>
        </div >
    )
}

export default Cell
