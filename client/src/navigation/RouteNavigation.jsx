// eslint-disable-next-line react/prop-types
import Guide from '../pages/Guide'
import ChooseGame from '../pages/ChooseGame'
import Profile from '../pages/Profile'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion';
import AccountForms from '../pages/AccountForms';

function Navigation({ isActive }) {

    return (
        <motion.div
            layout
            className=
            {
                classNames(
                    "w-full",
                    { 'hidden': isActive === '/' },
                    { 'grid': isActive !== '/' }
                )
            }
        >
            <AnimatePresence mode={'wait'}>
                {isActive === "/guide" && <Guide key={'guide'} />}
                {isActive === "/choose_games" && <ChooseGame key={'chooseGame'} />}
                {isActive == "/profile" && <Profile key={'profile'} />}
                {isActive == "/auth" && <AccountForms key={'auth'} />}
            </AnimatePresence>
        </motion.div>
    )
}

export default Navigation
