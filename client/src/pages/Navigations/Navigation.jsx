// eslint-disable-next-line react/prop-types
import Guide from '../Guide'
import ChooseGame from '../Games/ChooseGame'
import Profile from '../Profile'
import classNames from 'classnames'
import JoinGame from '../Games/JoinGame'
import WaitingScreen from '../Games/WaitingScreen'
import { motion, AnimatePresence } from 'framer-motion';

function Navigation({ isActive }) {

    return (
        <motion.div
            className=
            {
                classNames(
                    { 'hidden': isActive === '/' },
                    { 'grid': isActive !== '/' }
                )
            }
        >
            <AnimatePresence initial={false} mode={'wait'}>
                {isActive === "/guide" && <Guide key={'guide'} />}
                {isActive === "/choose_games" && <ChooseGame key={'chooseGame'} />}
                {isActive == "/profile" && <Profile key={'profile'} />}
            </AnimatePresence>
        </motion.div>
    )
}

export default Navigation
