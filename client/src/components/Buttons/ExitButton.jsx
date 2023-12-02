import IMAGES from "../../assets/images/images"

const ExitButton = ({ display, stopWatching}) => {
    return (
        <>
            <text className={`${display} place-self-center justify-self-center ml-6 text-3xl text-yellow-500`}>Back</text>
            <button
                className={`hover:bg-lavender hover:rounded-md  active:bg-black ${display} justify-self-start self-center`}
                onClick={stopWatching}
            >
                <img
                    src={IMAGES.backIcon}
                    alt="exit"
                    className='max-w-iconSize grid justify-self-center place-self-center' />
            </button>
        </>
    )
}

export default ExitButton