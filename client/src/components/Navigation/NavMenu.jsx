/* eslint-disable react/prop-types */
import { NavItems } from './NavItems'
import NavButtons from '../Buttons/NavButtons'
import SettingsButton from '../SettingsButton'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import IMAGES from '../../assets/images/images'
import classNames from 'classnames'
import { useSettingsContext } from '../../context/SettingsContext'

function NavMenu({ isActive, setIsActive }) {

    const { inGame } = useSettingsContext();

    return (
        <div className={
            classNames (
                `font-body flex-row flex-initial transition justify-center p-4`,
                {
                    'flex' : !inGame
                },
                {
                    'hidden' : inGame
                },
                {
                    'flex-row' : isActive === '/'
                },
                {
                    'flex-col' : isActive !== '/'
                }
            )
        }>
            {NavItems.map((item) => (
                <div key={item.name} className=''>
                    <NavButtons
                        isActive={isActive}
                        setIsActive={setIsActive}
                        url={item.url}
                        Icon={item.Icon}
                        imageAlt={item.imageAlt}
                    />
                </div>
            ))}
            <SettingsButton content={'Settings'} Icon={Cog8ToothIcon} imageAlt={'Settings'} imageSrc={IMAGES.settings} />
        </div>
    )
}

export default NavMenu
