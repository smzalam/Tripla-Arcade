/* eslint-disable react/prop-types */
import { NavItems } from './NavItems'
import NavButtons from '../Buttons/NavButtons'
import SettingsButton from '../SettingsButton'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import IMAGES from '../../assets/images/images'
import classNames from 'classnames'
import { useSettingsContext } from '../../context/SettingsContext'
import { motion } from 'framer-motion';

function NavMenu({ isActive, setIsActive }) {

    const { inGame } = useSettingsContext();

    return (
        <motion.div
            // layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
                duration: 1.5, 
                ease: 'easeOut', 
                // layout: { type: 'tween', duration: 1} 
            }}
            className={
                classNames(
                    `font-body flex-row flex-initial transition justify-center p-4`,
                    {
                        'flex': !inGame
                    },
                    {
                        'hidden': inGame
                    },
                    {
                        'flex-row': isActive === '/'
                    },
                    {
                        'flex-col': isActive !== '/'
                    }
                )
            }>
            {NavItems.map((item, idx) => {
                const delay = idx + 1
                return (
                    <motion.div initial={{ y: '-55vh' }} animate={{ y: 0 }} transition={{ delay: delay * 0.3, duration: 0.5, type: 'spring', stiffness: 70 }} key={item.name} className=''>
                        <NavButtons
                            isActive={isActive}
                            setIsActive={setIsActive}
                            url={item.url}
                            Icon={item.Icon}
                            imageAlt={item.imageAlt}
                        />
                    </motion.div>
                )
            })}
            <SettingsButton content={'Settings'} Icon={Cog8ToothIcon} imageAlt={'Settings'} imageSrc={IMAGES.settings} />
        </motion.div>
    )
}

export default NavMenu
