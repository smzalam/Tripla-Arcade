import { useState } from "react";
import SettingsModal from "./SettingsModal";

const SettingsButton = ({ content, Icon }) => {
    const [modal, setModal] = useState(false);

    return (
        <div className="overflow-visible">
            <SettingsModal modal={modal} setModal={setModal} />
            <button
                onClick={() => { setModal(true) }}
                className="group hover:bg-primary focus:bg-secondary flex flex-col transition-all duration-500 flex-initial justify-center place-items-center content-center h-full w-full"
            >
                {/* <img
                    src={imageSrc}
                    alt={imageAlt}
                    className='max-w-iconSize grid justify-self-center place-self-center group-hover:opacity-80 transition-all duration-1000 ease-in' /> */}
                <Icon className='text-secondary group-focus:text-primary w-12 h-12' />
                <span className="max-w-0 whitespace-nowrap overflow-hidden transition-all duration-1000 ease-in-out group-hover:max-w-md group-hover:text-white group-focus:text-white grid justify-self-center place-self-center group-hover:p-2">
                    {content}
                </span>
            </button>
        </div>
    )
}

export default SettingsButton