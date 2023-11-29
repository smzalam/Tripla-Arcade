import { Chat } from "stream-chat-react";
import ChooseGame from '../Games/ChooseGame';
import { client } from "../../lib/steam/config";
import Dashboard from "../Dashboard";
import Home from "../Home";
import Profile from '../Profile';

// eslint-disable-next-line react/prop-types
function Navigation({ isActive, isAuth }) {

    return (
        <>
            {isActive === "/" && !isAuth && <Home />}
            {isActive === "/" && isAuth && <Dashboard />}
            {isActive === "/choose_games" && 
                <Chat client={client} >
                    <ChooseGame isAuth={isAuth}/>
                </Chat>}
            {isActive == "/profile" && <Profile />}
        </>
    )
}

export default Navigation
