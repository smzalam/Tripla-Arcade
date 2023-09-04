/* eslint-disable react/prop-types */

function Cell({ cell, handleClick, game }) {

    let style = ""
    if (game === 'TicTacToe') {
        style = 'bg-white h-[75px] w-[75px]'
    } else {
        style = 'bg-white h-[75px] w-[75px] rounded-full'
    }

    return (
        <div className={style}>
            <button className="w-full h-full" type="button" onClick={handleClick}>
                {cell}
            </button>
        </div>
    )
}

export default Cell
