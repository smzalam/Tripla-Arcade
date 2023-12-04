import { useState } from "react";
import AuthModal from "./AuthModal";
import SettingsModal from "./SettingsModal";

const SettingsButton = ({ content, imageSrc, imageAlt }) => {
    const [modal, setModal] = useState(false);

    return (
        <div className="grid justify-end">
            <button
                onClick={() => { setModal(true) }}
                className="group mx-2 my-2 h-min w-min inline-flex justify-end items-middle border-2 rounded-md"
            >
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className='max-w-md p-4 grid justify-self-center place-self-center' />
                <span className="max-w-0 whitespace-nowrap overflow-hidden text-2xl transition-all duration-1000 ease-in-out group-hover:max-w-md grid justify-self-center place-self-center group-hover:my-4 group-hover:pr-2">
                    {content}
                </span>
            </button>
            <SettingsModal modal={modal} setModal={setModal} />

        </div >
    )
}

export default SettingsButton