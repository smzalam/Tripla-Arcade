/* eslint-disable react/prop-types */
// import React from 'react'

import Connect4Game from "../Games/Connect4Game"
import MiniKahootGame from "../Games/MiniKahootGame"
import TicTacToeGame from "../Games/TicTacToeGame"
import { Channel } from "stream-chat-react";

function GameNavigation({ channel, setChannel, game }) {

    return (
        <>
            {game === 'TicTacToe' &&
                <div className="row-span-5 grid grid-row-1">
                    <Channel channel={channel} className="w-full h-full">
                        <TicTacToeGame channel={channel} setChannel={setChannel} game={game}></TicTacToeGame>
                    </Channel>
                </div>
            }
            {game === 'Connect4' && 
                <Channel channel={channel}>
                    <Connect4Game channel={channel} setChannel={setChannel} game={game}></Connect4Game>
                </Channel>
            }
            {game === 'MiniKahoot' && 
                <Channel channel={channel}>
                    <MiniKahootGame channel={channel} setChannel={setChannel} game={game}></MiniKahootGame>
                </Channel>
            }
        </>
    )
}

export default GameNavigation
