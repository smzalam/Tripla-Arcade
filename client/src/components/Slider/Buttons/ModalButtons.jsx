import { motion } from "framer-motion";

const ModalButtons = ({ setModal, content }) => {
    return (
        <motion.button
            initial={{background: 'var(--secondary)'}}
            whileHover={{ scale: 1.1, background: "var(--accent)" }}
            onHoverEnd={() => console.log('hover ends')}
            onClick={() => { setModal(true) }}
            className="cursor-pointer text-text rounded-md h-max w-max px-10 py-3"
        >
            {content}
        </motion.button>
    )
}

export default ModalButtons