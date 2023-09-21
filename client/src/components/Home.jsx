import Nav from "./Nav";
import ChooseGame from "./ChooseGame"
import ShowForm from "./ShowForm";
import { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";



// eslint-disable-next-line react/prop-types
function Home() {

    const [showForm, setShowForm] = useState(null);
    const apiKey = import.meta.env.VITE_apiKey;
    const cookies = new Cookies();
    const token = cookies.get("token");
    const client = StreamChat.getInstance(apiKey);
    const [isAuth, setIsAuth] = useState(false);
    const [showNav, setShowNav] = useState(true);

    const logout = () => {
        cookies.remove("token");
        cookies.remove("userID");
        cookies.remove("firstName");
        cookies.remove("lastName");
        cookies.remove("hashedPassword");
        cookies.remove("channelName");
        cookies.remove("username");
        client.disconnectUser();
        setIsAuth(false);
    }

    if (token) {
        try {
            client.connectUser(
                {
                    id: cookies.get("userID"),
                    name: cookies.get("username"),
                    firstName: cookies.get('firstName'),
                    lastName: cookies.get('lastName'),
                    hashedPassword: cookies.get("hashedPassword")
                },
                token)
                .then(() => { setIsAuth(true) })
        } catch (error) {
            console.log(error);
        }
    }

    if (isAuth) {
        return (
            <div className="bg-text w-screen h-screen grid grid-rows-6">
                <Nav isAuth={isAuth} logout={logout} showNav={showNav}></Nav>
                <Chat client={client} >
                    <ChooseGame setShowNav={setShowNav} />
                </Chat>
            </div>
        )
    }

    return (
        <div className="bg-text w-screen h-screen grid grid-rows-6">
            <Nav isAuth={isAuth}></Nav>
            <div className="grid grid-cols-2 row-start-2 row-span-6">
                <div className="h-max text-white text-9xl p-3 px-10">
                    Competitive fun at its simplest.
                </div>
                {showForm ? (
                    <>
                        <ShowForm
                            showForm={showForm}
                            setIsAuth={setIsAuth}
                            setShowForm={setShowForm}>
                        </ShowForm>
                    </>
                ) : (
                    <div className="grid grid-rows-2 justify-center align-center">
                        <button
                            onClick={() => {
                                setShowForm('login');
                            }}
                            className="bg-black hover:bg-lavender text-white hover:text-black rounded-md p-3 px-[100px] mb-3 h-max w-[500px] row-start-1 row-end-2 place-self-end">
                            Log In
                        </button>
                        <button
                            onClick={() => {
                                setShowForm('signup')
                            }}
                            className="bg-yellow-500 hover:bg-lavender p-3 px-[100px] rounded-md h-max w-[500px] row-start-2 place-self-top">
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
