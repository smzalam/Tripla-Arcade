// eslint-disable-next-line react/prop-types
import Guide from '../Guide'
import ChooseGame from '../Games/ChooseGame'
import Profile from '../Profile'
import classNames from 'classnames'

function Navigation({ isActive }) {


    return (
        <div
            className=
            {   
                classNames(
                    { 'hidden': isActive === '/' },
                    { 'grid': isActive !== '/' }
                )
            }
        >
            {isActive === "/guide" && <Guide />}
            {isActive === "/choose_games" && <ChooseGame />}
            {isActive == "/profile" && <Profile />}
        </div>
    )
}

export default Navigation
