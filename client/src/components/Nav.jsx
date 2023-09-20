/* eslint-disable react/prop-types */
import IMAGES from '../images/images'

function Nav({ isAuth }) {
    let menuVisiblity = '';
    if (isAuth === true) {
        menuVisiblity = 'grid'
    } else {
        menuVisiblity = 'hidden'
    }
    return (
        <div className="bg-headings grid grid-cols-4">
            <div className="font-title text-lavender text-6xl col-start-1 col-end-4 justify-self-center place-self-center">
                tripla arcade
            </div>
            <div className={`${menuVisiblity} grid-cols-3`}>
                <button className='hover:bg-lavender grid'>
                    <img
                        src={IMAGES.gamesIcon}
                        alt="Games"
                        className='max-w-iconSize grid justify-self-center place-self-center' />
                </button>
                <button className='hover:bg-lavender grid'>
                    <img
                        src={IMAGES.leaderboardIcon}
                        alt="Leaderboard"
                        className='max-w-iconSize grid justify-self-center place-self-center' />
                </button>
                <button className='hover:bg-lavender grid'>
                    <img
                        src={IMAGES.profileIcon}
                        alt="Profile"
                        className='max-w-iconSize grid justify-self-center place-self-center' />
                </button>
            </div>
        </div >
    )
}

export default Nav
