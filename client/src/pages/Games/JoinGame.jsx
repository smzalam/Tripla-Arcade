/* eslint-disable react/prop-types */
import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import IMAGES from '../../assets/images/images';
import Game from "../Navigations/GameNavigation";
import ChooseGame from "./ChooseGame";

function JoinGame({ game }) {

    const [rivalUserName, setRivalUserName] = useState("");
    const [channel, setChannel] = useState(null);
    const [exit, setExit] = useState(false)
    const { client } = useChatContext();
    const createChannel = async () => {
        const response = await client.queryUsers({ name: { $eq: rivalUserName } });
        if (response.length == 0) {
            alert("User not found.")
            return
        }
        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id]
        })
        await newChannel.watch();
        setChannel(newChannel);
    }

    if (exit) {
        return (
            <ChooseGame></ChooseGame>
        )
    }
    return (
        <>
            {channel ? (
                <Game channel={channel} setChannel={setChannel} game={game}></Game>
            ) : (
                <div className="row-span-3 grid grid-cols-6 h-full w-full">
                    <div className='col-start-2 col-span-4 grid grid-rows-4'>
                        <h4 className="row-span-2 justify-self-center place-self-center text-2xl text-smoky font-bold">
                            Enter the username of the person you want to play the game with!
                        </h4>
                        <div className="justify-self-center place-self-center row-start-2 grid grid-cols-3 w-full h-2/4">
                            <input
                                placeholder='Username of rival...'
                                onChange={
                                    (event) => {
                                        setRivalUserName(event.target.value)
                                    }
                                }
                                className="col-span-2 bg-white rounded-md w-full h-full p-3 place-self-center" />
                            <button
                                onClick={createChannel}
                                className="bg-yellow-500 hover:bg-lavender active:bg-black active:text-white p-7 rounded-md w-full h-full ml-2">
                                Join Game
                            </button>
                        </div>

                        <button
                            className='hover:bg-lavender active:bg-black w-1/4 rounded-md grid place-self-center'
                            onClick={() => setExit(true)}
                        >
                            <img
                                src={IMAGES.backIcon}
                                alt="Leaderboard"
                                className='max-w-iconSize grid justify-self-center place-self-center' />
                        </button>
                    </div >
                </div>
            )}
        </>
    );
}

export default JoinGame
