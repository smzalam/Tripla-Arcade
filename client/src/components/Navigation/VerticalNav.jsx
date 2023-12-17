import { NavItems } from './NavItems'
import NavButtons from '../Buttons/NavButtons'
import SettingsButton from '../SettingsButton'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import IMAGES from '../../assets/images/images'

const VerticalNav = ({ setIsActive }) => {
    return (
        <div className={`font-body bg-background flex flex-row flex-initial transition justify-center p-4`}>
            {NavItems.map((item) => (
                <div key={item.name} className=''>
                    <NavButtons
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

export default VerticalNav