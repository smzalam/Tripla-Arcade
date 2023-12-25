/* eslint-disable react/prop-types */
// import { useState } from 'react'
import Cell from './Cell'
import { motion } from 'framer-motion';

function Board({ board, handleClick, game }) {
    // const [board, setBoard] = useState()
    // const length = board.length;
    // const width = board[0].length;
    // let style = "";

    // if (game === 'TicTacToe') {
    let style = 'bg-blend-overlay grid grid-rows-3 grid-cols-3 rounded-lg p-3'
    // } else {
        // style = 'bg-lavender grid grid-rows-6 grid-cols-7 gap-2 border-8 border-black'
    // }

    const boardVariant = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.3
            }
        }
    }


    const cellVariant = {
        hidden: {
            x: -20,
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
        },
    }

    return (
        <motion.div variants={boardVariant} initial="hidden" animate="visible" className={style}>
            {board.map(
                (row, rowIdx) =>
                    row.map(
                        (cell, colIdx) =>
                            <motion.div
                                variants={cellVariant}
                                key={`${colIdx}-${rowIdx}`}
                            >
                                <Cell key={`${colIdx}-${rowIdx}`}
                                    cell={cell}
                                    handleClick={
                                        () =>
                                            handleClick(colIdx, rowIdx)}
                                    game={game}
                                >
                                </Cell>
                            </motion.div>
                    )
            )}
        </motion.div>
    )
}

export default Board
