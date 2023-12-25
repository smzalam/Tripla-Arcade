import { useState } from 'react';
import DetailsModal from './Modals/DetailsModal'
import PowerUpModal from './Modals/PowerUpModal'
import ModalButtons from './Buttons/ModalButtons';
import PlayButton from './Buttons/PlayButton';
import JoinButton from './Buttons/JoinButton';
import { motion } from 'framer-motion';

const SliderItem = ({ activateGame, activateJoin, game }) => {
    const [detailsModal, setDetailsModal] = useState(false);
    const [powerUpModal, setPowerUpModal] = useState(false);

    return (
        <motion.div
            initial={{ rotate: '180deg' }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.25 }}
            whileHover={{scale: 1.1, transition: {duration: 0.2, type: "spring", stiffness: 100, damping: 5}}}
            className='h-4/5 w-5/6 rounded-lg flex flex-col justify-evenly bg-gradient-to-r from-primary to-secondary'
        >
            <div className='py-3 px-5 text-6xl text-text h-full w-full basis-3/4 flex items-end'>
                {game}
            </div>
            <div className='basis-1/4 flex flex-row'>
                <div className='py-3 px-6 flex flex-row gap-5 items-center'>
                    <DetailsModal
                        modal={detailsModal}
                        setModal={setDetailsModal}
                        game={game}
                    />
                    <ModalButtons setModal={setDetailsModal} content={'Details'} />
                    <ModalButtons setModal={setPowerUpModal} content={'Daily PowerUp'} />
                    <PowerUpModal
                        modal={powerUpModal}
                        setModal={setPowerUpModal}
                        game={game}
                    />
                </div>
                <div className='flex gap-6 justify-end w-full items-center px-6'>
                    <PlayButton activateGame={activateGame} game={game} />
                    <JoinButton activateJoin={activateJoin} game={game} />
                </div>
            </div>
        </motion.div>
    )
}

export default SliderItem