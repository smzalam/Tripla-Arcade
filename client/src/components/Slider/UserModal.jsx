import { useNavigationContext } from '../../context/NavigationContext';
import Modal from '../Modal';

const UserModal = ({ modal, setModal, activateGame, game }) => {

    const { setIsActive } = useNavigationContext();

    return (
        <Modal
            openModal={modal}
            closeModal={() => setModal(false)}
        >
            <div className='flex flex-row text-white place-content-center gap-4 w-full'>
                <button
                    className='bg-secondary rounded-lg h-max place-self-center py-4 px-10 mx-10'
                    onClick={() => { activateGame(game) }}
                >
                    Play as a Guest!
                </button>
                <button
                    className='bg-secondary rounded-lg h-max place-self-center py-4 px-10 mx-10'
                    onClick={() => { setIsActive('/login') }}
                >
                    Play as a User!
                </button>
            </div>
        </Modal>
    )
}

export default UserModal