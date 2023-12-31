import { motion } from "framer-motion";

const NavigationCards = ({ title, clickHandler }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 200 } }}
            className='group place-self-center cursor-pointer group w-[25%] h-[70%] rounded-[20px] relative overflow-hidden'
            onClick={clickHandler}
        >
            <div className='group-hover:bg-purple-800/80 flex justify-center place-items-center w-full h-full object-cover rounded-[10px] bg-secondary'
                >
                <h1 className='text-[2rem] font-bold group-hover:from-text group-hover:to-accent bg-gradient-to-r from-primary to-background bg-clip-text text-transparent'>
                    {title}
                </h1>
            </div>
        </motion.div>
    )
}

export default NavigationCards