import { useState } from "react";
import SettingsModal from "./SettingsModal";

const SettingsButton = ({ content, imageSrc, imageAlt }) => {
    const [modal, setModal] = useState(false);

    return (
        <div className="overflow-visible">
            <SettingsModal modal={modal} setModal={setModal} />
            <button
                onClick={() => { setModal(true) }}
                className="group hover:bg-lavender focus:bg-black flex flex-col flex-initial justify-center w-full h-full"
            >
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className='max-w-iconSize flex justify-self-center place-self-center' />
                <span className="max-w-0 whitespace-nowrap overflow-hidden transition-all duration-1000 ease-in-out group-hover:max-w-md group-focus:max-w-md grid justify-self-center place-self-center group-hover:my-4 group-focus:my-4 group-focus:p-2 group-focus:text-white group-hover:p-2">
                    {content}
                </span>
            </button>
        </div>
    )
}

export default SettingsButton