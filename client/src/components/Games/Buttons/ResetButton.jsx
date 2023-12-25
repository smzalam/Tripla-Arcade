import IMAGES from "../../../assets/images/images"

const ResetButton = ({ reset }) => {
    return (
        <>
            <button
                className='flex flex-row hover:bg-background px-7 py-4 hover:rounded-md gap-4 h-full'
                onClick={reset}
            >
                <img
                    src={IMAGES.resetIcon}
                    alt="reset"
                    className='max-w-iconSize grid justify-self-center place-self-center' />
                <text className='place-self-center justify-center text-3xl text-yellow-500'>Reset</text>
            </button>
        </>
    )
}

export default ResetButton