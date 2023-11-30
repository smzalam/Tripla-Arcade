import IMAGES from "../../assets/images/images";

const WaitingScreen = ({ stopWatching }) => {
    return (
        <div className='grid grid-rows-4 w-screen h-[82.5vh]'>
            <div className='pt-24 place-self-center justify-self-center row-span-2 text-4xl text-smoky font-bold'>
                Waiting for the other player to join...
            </div>
            <button
                className='hover:bg-lavender active:bg-black grid w-1/4 rounded-md place-self-center'
                onClick={stopWatching}
            >
                <img
                    src={IMAGES.backIcon}
                    alt="Leaderboard"
                    className='max-w-iconSize grid justify-self-center place-self-center' />
            </button>
        </div>
    )
}

export default WaitingScreen