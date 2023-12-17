/* eslint-disable react/prop-types */
import VerticalNav from './VerticalNav';
import SideNav from './SideNav';

function NavMenu({ isActive, setIsActive }) {

    return (
        <>
            {isActive === '/' && <VerticalNav setIsActive={setIsActive} />}
            {isActive !== '/' && <SideNav setIsActive={setIsActive} />}
        </>
    )
}

export default NavMenu
