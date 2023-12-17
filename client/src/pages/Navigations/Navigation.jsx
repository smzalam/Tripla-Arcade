// eslint-disable-next-line react/prop-types
import Guide from '../Guide'
import ChooseGame from '../Games/ChooseGame'
import Profile from '../Profile'
import classNames from 'classnames'
import JoinGame from '../Games/JoinGame'

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
            {isActive == "/join" && <JoinGame />}
        </div>
    )
}

export default Navigation
