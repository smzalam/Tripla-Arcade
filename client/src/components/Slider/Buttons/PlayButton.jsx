import { motion } from "framer-motion";

const PlayButton = ({ activateGame, game }) => {

    return (
        <motion.button
            initial={{background: 'var(--background)'}}
            whileHover={{ scale: 1.1, background: "var(--accent)" }}
            onClick={() => {
                activateGame(game)
            }}
            className="cursor-pointer bg-background rounded-md h-max w-max text-text px-10 py-2 text-2xl"
        >
            Play!
        </motion.button>
    )
}

export default PlayButton