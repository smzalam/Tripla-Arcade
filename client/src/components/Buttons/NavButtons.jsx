import classNames from "classnames"

const NavButtons = ({ setIsActive, url, imageSrc, imageAlt, iconsSize }) => {
    return (
        <button
            onClick={() => { setIsActive(url) }}
            className=
            {
                classNames('group hover:bg-lavender focus:bg-black flex flex-col transition-all duration-500 flex-initial justify-center content-center h-full w-full')
            }
        >
            <img
                src={imageSrc}
                alt={imageAlt}
                className={`max-w-iconSize grid justify-self-center place-self-center group-hover:opacity-20 transition-all duration-1000 ease-in`} />
            <span className="max-w-0 whitespace-nowrap overflow-hidden transition-all duration-1000 ease-in-out group-hover:max-w-md group-focus:text-white grid justify-self-center place-self-center group-hover:p-2">
                sdsdsasas
            </span>
        </button>
    )
}

export default NavButtons