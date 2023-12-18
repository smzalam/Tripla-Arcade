import { useState } from "react"
import ReadyButton from './ReadyButton'

const WaitingScreen = () => {
    const [ready, setReady] = useState(false);
    return (
        <div className="bg-secondary rounded-lg flex flex-col justify-around items-center w-full h-full ">
            <div className="bg-background text-text w-max px-10 h-1/4 rounded-lg place-self-center flex flex-row gap-10 justify-center items-center">
                <div className=" text-4xl rounded-lg">
                    Room Code: 
                </div>
                <div className="text-2xl">
                    WIQGFIQWUGF8
                </div>
            </div>
            {ready && <ReadyButton />}
            {!ready &&
                <div className="mb-20 text-background text-7xl">
                    Waiting for Player 2 to join...
                </div>
            }
        </div>
    )
}

export default WaitingScreen