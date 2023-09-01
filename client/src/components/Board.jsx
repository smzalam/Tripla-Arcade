/* eslint-disable react/prop-types */
// import { useState } from 'react'
import Cell from './Cell'

function Board({ board, handleClick }) {
    // const [board, setBoard] = useState()
    // const length = board.length;
    // const width = board[0].length;
    return (
        <div className='inline-block'>
            <div className='bg-black grid grid-rows-3 grid-cols-3 gap-2'>
                {board.map((row, rowIdx) => row.map((cell, colIdx) => <Cell key={`${colIdx}-${rowIdx}`} cell={cell} handleClick={() => handleClick(colIdx, rowIdx)}></Cell>))}
            </div>
        </div>
    )
}

export default Board
