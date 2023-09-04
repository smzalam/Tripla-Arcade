/* eslint-disable react/prop-types */

function Cell({ cell, handleClick, game }) {

    const CELL_STYLE = {
        TicTacToe: 'bg-white h-[75px] w-[75px]',
        Connect4: 'bg-white h-[75px] w-[75px] rounded-full'
    }
    const PLAYER_COLOR = {
        TicTacToe: () => 'bg-white',
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


    return (
        <div className={`${CELL_STYLE[game]}`}>
            <button className={`${PLAYER_COLOR[game](cell)} rounded-full w-full h-full`} type="button" onClick={handleClick}>
                {CELL_VALUE[game]}
            </button>
        </div >
    )
}

export default Cell
