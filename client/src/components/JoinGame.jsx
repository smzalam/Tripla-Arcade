/* eslint-disable react/prop-types */
import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import Game from "./Game";
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
                <div className='joinGame'>
                    <h4>Create Game</h4>
                    <input placeholder='Username of rival...' onChange={(event) => { setRivalUserName(event.target.value) }} />
                    <button onClick={createChannel}>Join Game</button>
                    <button onClick={() => setExit(true)}>Exit</button>
                </div >
            )}
        </>
    );
}

export default JoinGame
