/* eslint-disable react/prop-types */
// import React from 'react'

import Connect4Game from "./Connect4Game"
import MiniKahootGame from "./MiniKahootGame"
import TicTacToeGame from "./TicTacToeGame"
import { Channel } from "stream-chat-react";

function Game({ channel, game }) {
    console.log(game)
    if (game === 'TicTacToe') {
        console.log(channel)
        return (
            <Channel channel={channel}>
                <TicTacToeGame channel={channel}></TicTacToeGame>
            </Channel>
        )
    }
    if (game === 'Connect4') {
        console.log('no heree')
        return (
            <Channel channel={channel}>
                <Connect4Game channel={channel}></Connect4Game>
            </Channel>
        )
    }
    if (game === 'MiniKahoot') {
        return (
            <Channel channel={channel}>
                <MiniKahootGame channel={channel}></MiniKahootGame>
            </Channel>
        )
    }

}

export default Game
