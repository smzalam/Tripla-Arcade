
const NavButtons = ({ setIsActive, url, imageSrc, imageAlt }) => {
    return (
        <button
            onClick={() => { setIsActive(url) }}
            className='hover:bg-lavender focus:bg-black grid'>
            <img
                src={imageSrc}
                alt={imageAlt}
                className='max-w-iconSize grid justify-self-center place-self-center' />
        </button>
    )
}

export default NavButtons