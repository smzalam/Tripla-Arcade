import IMAGES from "../../assets/images/images"

const ResetButton = ({ reset }) => {
    return (
        <>
            <text className='place-self-center justify-self-center mt-7 ml-6 text-3xl text-yellow-500'>Reset</text>
            <button
                className='hover:bg-black hover:rounded-md active:bg-black grid w-full h-full mt-5'
                onClick={reset}
            >
                <img
                    src={IMAGES.resetIcon}
                    alt="reset"
                    className='max-w-iconSize grid justify-self-center place-self-center' />
            </button>
        </>
    )
}

export default ResetButton