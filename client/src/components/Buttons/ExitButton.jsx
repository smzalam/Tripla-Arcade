import IMAGES from "../../assets/images/images"

const ExitButton = ({ display, deactivateGame}) => {
    return (
        <>
            <text className={`${display} place-self-center justify-self-center ml-6 text-3xl text-text`}>Back</text>
            <button
                className={`hover:bg-secondary ml-3 hover:rounded-md  active:bg-black ${display} justify-self-start self-center`}
                onClick={deactivateGame}
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