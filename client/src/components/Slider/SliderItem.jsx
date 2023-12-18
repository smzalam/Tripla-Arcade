import { useState } from 'react';
import DetailsModal from '../DetailsModal'
import PowerUpModal from '../PowerUpModal'
import ModalButtons from './Buttons/ModalButtons';
import PlayButton from './Buttons/PlayButton';
import JoinButton from './Buttons/JoinButton';

const SliderItem = ({game}) => {
    const [detailsModal, setDetailsModal] = useState(false);
    const [powerUpModal, setPowerUpModal] = useState(false);

    return (
        <div className='h-4/5 w-5/6 rounded-lg flex flex-col justify-evenly bg-gradient-to-r from-primary to-secondary'>
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
                    <PlayButton />
                    <JoinButton />
                </div>
            </div>
        </div>
    )
}

export default SliderItem