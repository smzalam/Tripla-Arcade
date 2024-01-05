/* eslint-disable react/prop-types */
import { NavItems } from './NavItems'
import NavButtons from './Buttons/NavButtons'
import SettingsButton from './Buttons/SettingsButton'
import { Cog8ToothIcon, UserIcon, ArrowRightEndOnRectangleIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import IMAGES from '../../assets/images/images'
import classNames from 'classnames'
import { motion } from 'framer-motion';
import { useNavigationContext } from '../../context/NavigationContext'
import { useAuthContext } from '../../context/AuthContext'

function NavMenu() {

    const { isActive, setIsActive } = useNavigationContext();
    const { isAuth } = useAuthContext();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 1.5,
                ease: 'easeOut',
                layout: { type: 'tween', duration: 1 }
            }}
            className={
                classNames(
                    `font-body flex flex-row flex-initial transition justify-center p-4`,
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
            {
                isAuth ? (
                    <>
                        <motion.div initial={{ y: '-55vh' }} animate={{ y: 0 }} transition={{ delay: 1.2, duration: 0.5, type: 'spring', stiffness: 70 }} key={'profile'} className=''>
                            <NavButtons
                                isActive={isActive}
                                setIsActive={setIsActive}
                                url={'/profile'}
                                Icon={UserIcon}
                                imageAlt={'Profile'}
                            />
                        </motion.div>
                        <motion.div initial={{ y: '-55vh' }} animate={{ y: 0 }} transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 70 }} key={'profile'} className=''>
                            <NavButtons
                                isActive={isActive}
                                setIsActive={setIsActive}
                                url={'/logout'}
                                Icon={ArrowLeftStartOnRectangleIcon}
                                imageAlt={'Logout'}
                            />
                        </motion.div>
                    </>
                ) : (
                    <motion.div initial={{ y: '-55vh' }} animate={{ y: 0 }} transition={{ delay: 1.2, duration: 0.5, type: 'spring', stiffness: 70 }} key={'login'} className=''>
                        <NavButtons
                            isActive={isActive}
                            setIsActive={setIsActive}
                            url={'/login'}
                            Icon={ArrowRightEndOnRectangleIcon}
                            imageAlt={'Log In'}
                        />
                    </motion.div>
                )
            }
        </motion.div>
    )
}

export default NavMenu
