import IMAGES from "../../assets/images/images"

const ExitButton = ({ display, deactivateGame }) => {
    let styles = ''
    let hoverStyles = ''
    let handler = () => { }

    if (display === 'grey') {
        styles = 'grid place-self-center justify-self-center ml-6 text-3xl text-gray-400'
        hoverStyles = 'flex flex-row gap-4 ml-4 hover:rounded-md cursor-not-allowed place-items-center'
    } else {
        styles = 'grid place-self-center justify-self-center ml-6 text-3xl text-accent'
        hoverStyles = 'flex flex-row gap-4 hover:bg-secondary ml-4 hover:rounded-md  active:bg-black place-items-center'
        handler = deactivateGame
    }

    return (
        <>
            <button
                className={`${hoverStyles}`}
                onClick={handler}
            >
                <text className={`${styles}`}>Back</text>
                <img
                    src={IMAGES.backIcon}
                    alt="exit"
                    className='max-w-iconSize grid justify-self-center place-self-center mr-4' />
            </button>
        </>
    )
}

export default ExitButton