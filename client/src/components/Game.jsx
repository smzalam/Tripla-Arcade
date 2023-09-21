/* eslint-disable react/prop-types */
// import React from 'react'

import Connect4Game from "./Connect4Game"
import MiniKahootGame from "./MiniKahootGame"
import TicTacToeGame from "./TicTacToeGame"
import { Channel } from "stream-chat-react";

function Game({ channel, setChannel, game, setShowNav }) {

    setShowNav(false);

    if (game === 'TicTacToe') {
        return (
            <div className="row-span-5 grid grid-row-1">
                <Channel channel={channel} className="w-full h-full">
                    <TicTacToeGame channel={channel} setChannel={setChannel} game={game}></TicTacToeGame>
                </Channel>
            </div>
        )
    }
    if (game === 'Connect4') {
        return (
            <Channel channel={channel}>
                <Connect4Game channel={channel} setChannel={setChannel} game={game}></Connect4Game>
            </Channel>
        )
    }
    if (game === 'MiniKahoot') {
        return (
            <Channel channel={channel}>
                <MiniKahootGame channel={channel} setChannel={setChannel}></MiniKahootGame>
            </Channel>
        )
    }

}

export default Game
