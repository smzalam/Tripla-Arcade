import { useState } from "react";
import SettingsModal from "./SettingsModal";
import classNames from "classnames";

const SettingsButton = ({ content, Icon }) => {
    const [modal, setModal] = useState(false);

    return (
        <div className="overflow-visible">
            <SettingsModal modal={modal} setModal={setModal} />
            <button
                onClick={() => { setModal(true) }}
                className="group hover:bg-primary hover:rounded-lg focus:bg-secondary focus:rounded-lg flex flex-col transition-all duration-500 flex-initial justify-center place-items-center content-center h-full w-full"
            >
                {/* <img
                    src={imageSrc}
                    alt={imageAlt}
                    className='max-w-iconSize grid justify-self-center place-self-center group-hover:opacity-80 transition-all duration-1000 ease-in' /> */}
                <Icon className='text-secondary group-focus:text-primary w-16 h-16 pt-2' />
                <span className={
                    classNames(
                        "text-nav max-w-0 whitespace-nowrap overflow-hidden transition-all duration-1000 ease-in-out group-hover:max-w-md group-focus:max-w-md group-focus:text-white group-hover:p-2 group-focus:p-2"
                    )
                }>
                    {content}
                </span>
            </button>
        </div>
    )
}

export default SettingsButton