/* eslint-disable react/prop-types */
import IMAGES from '../assets/images/images'
import { useUserContext } from '../context/AuthContext';

function NavMenu({ setIsActive }) {
    const { logout } = useUserContext();

    // let menuVisiblity = '';
    // let grid_cols = '';
    // if (isAuth === true && showNav === true) {
    // menuVisiblity = 'grid'
    // grid_cols = 'grid-cols-4'
    // } else {
    // menuVisiblity = 'hidden'
    // grid_cols = 'grid-cols-1'
    // }

    return (
        // <div className={`bg-headings grid ${grid_cols}`}>
        <div className={`bg-headings grid grid-cols-4`}>
            <div 
                className="font-title text-lavender text-6xl col-start-1 col-end-4 justify-self-center place-self-center">
                <button 
                    onClick={() => { setIsActive('/') }}
                >
                tripla arcade
                </button>
            </div>
            {/* <div className={`${menuVisiblity} grid-cols-4`}> */}
            <div className={`grid grid-cols-4`}>
                <button
                    onClick={() => { setIsActive('/choose_games') }}
                    className='hover:bg-lavender focus:bg-black grid'>
                    <img
                        src={IMAGES.gamesIcon}
                        alt="Games"
                        className='max-w-iconSize grid justify-self-center place-self-center' />
                </button>
                <button
                    onClick={() => { setIsActive('/leaderboard') }}
                    className='hover:bg-lavender focus:bg-black grid'>
                    <img
                        src={IMAGES.leaderboardIcon}
                        alt="Leaderboard"
                        className='max-w-iconSize grid justify-self-center place-self-center' />
                </button>
                <button
                    onClick={() => { setIsActive('/profile') }}
                    className='hover:bg-lavender focus:bg-black grid'>
                    <img
                        src={IMAGES.profileIcon}
                        alt="Profile"
                        className='max-w-iconSize grid justify-self-center place-self-center' />
                </button>
                <button
                    onClick={logout}
                    className='hover:bg-lavender focus:bg-black grid'>
                    <img
                        src={IMAGES.logoutIcon}
                        alt="Logout"
                        className='max-w-iconSize grid justify-self-center place-self-center' />
                </button>
            </div>
        </div >
    )
}

export default NavMenu
