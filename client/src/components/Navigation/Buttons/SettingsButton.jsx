import { useState } from "react";
import SettingsModal from "../../SettingsModal/SettingsModal";
import classNames from "classnames";
import { motion } from "framer-motion";

const SettingsButton = ({ content, Icon }) => {
    const [modal, setModal] = useState(false);

    return (
        <motion.div
            initial={{ y: '-55vh' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.9, duration: 1, type: 'spring', stiffness: 70 }}
            className="h-full overflow-hidden">
            <SettingsModal modal={modal} setModal={setModal} />
            <button
                onClick={() => { setModal(true) }}
                className="group hover:bg-primary hover:rounded-lg flex flex-col transition-all duration-500 flex-initial justify-center place-items-center content-center h-full w-full"
            >
                {/* <img
                    src={imageSrc}
                    alt={imageAlt}
                    className='max-w-iconSize grid justify-self-center place-self-center group-hover:opacity-80 transition-all duration-1000 ease-in' /> */}
                <Icon className='text-secondary w-16 h-16 pt-2' />
                <span className={
                    classNames(
                        "text-nav max-w-0 whitespace-nowrap overflow-hidden transition-all duration-1000 ease-in-out group-hover:max-w-md group-hover:p-2"
                    )
                }>
                    {content}
                </span>
            </button>
        </motion.div>
    )
}

export default SettingsButton