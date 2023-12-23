/* eslint-disable react/prop-types */
// import { useState } from 'react'
import Cell from './Cell'
import {motion} from 'framer-motion';

function Board({ board, handleClick, game }) {
    // const [board, setBoard] = useState()
    // const length = board.length;
    // const width = board[0].length;
    let style = "";

    if (game === 'TicTacToe') {
        style = 'bg-blend-overlay grid grid-rows-3 grid-cols-3 rounded-lg p-3'
    } else {
        style = 'bg-lavender grid grid-rows-6 grid-cols-7 gap-2 border-8 border-black'
    }

    return (
        <motion.div layout className={style}>
            {board.map(
                (row, rowIdx) =>
                    row.map(
                        (cell, colIdx) =>
                            <Cell key={`${colIdx}-${rowIdx}`}
                                cell={cell}
                                handleClick={
                                    () =>
                                        handleClick(colIdx, rowIdx)}
                                game={game}>
                            </Cell>
                    )
            )}
        </motion.div>
    )
}

export default Board
