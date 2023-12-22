import { motion } from "framer-motion";

const JoinButton = ({ activateJoin, game }) => {

    return (
        <motion.button
            initial={{background: 'var(--background)'}}
            whileHover={{ scale: 1.1, background: "var(--accent)" }}
            onClick={() => { activateJoin(game) }}
            className="cursor-pointer bg-background rounded-md h-max w-max text-text px-10 py-2 text-2xl"
        >
            Join!
        </motion.button>
    )
}

export default JoinButton