/* eslint-disable react/prop-types */
import IMAGES from '../assets/images/images';
import { NavItems } from './Navigation/NavItems';
import NavButtons from './Buttons/NavButtons';
import SettingsButton from './SettingsButton';

function NavMenu({ setIsActive }) {

    return (
            <div className={`bg-headings flex flex-row flex-initial transition justify-center p-4`}>
                {NavItems.map((item) => (
                    <div key={item.name} className=''>
                        <NavButtons
                            setIsActive={setIsActive}
                            url={item.url}
                            imageSrc={item.imageSrc}
                            imageAlt={item.imageAlt}
                        />
                    </div>
                ))}
                <SettingsButton content={'Settings'} imageAlt={'Settings'} imageSrc={IMAGES.settings} />
            </div>
    )
}

export default NavMenu
