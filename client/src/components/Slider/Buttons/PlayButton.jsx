import { motion } from "framer-motion";
import { useAuthContext } from '../../../context/AuthContext';
import { useState } from "react";
import UserModal from "../UserModal";

const PlayButton = ({ activateGame, game }) => {

    const { isAuth } = useAuthContext();
    const [modal, setModal] = useState(false);

    return (
        <>
            <UserModal modal={modal} setModal={setModal} activateGame={activateGame} game={game} />
            <motion.button
                initial={{ background: 'var(--background)' }}
                whileHover={{ scale: 1.1, background: "var(--accent)" }}
                onClick={() => {
                    if (isAuth) {
                        activateGame(game)
                    } else {
                        setModal(true)
                    }
                }}
                className="cursor-pointer bg-background rounded-md h-max w-max text-text px-10 py-2 text-2xl"
            >
                Play!
            </motion.button>
        </>
    )
}

export default PlayButton