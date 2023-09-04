import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChooseGame from "./components/ChooseGame"

function App() {
  const apiKey = import.meta.env.VITE_apiKey;
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(apiKey);
  const [isAuth, setIsAuth] = useState(false);

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

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <ChooseGame />
          <button onClick={logout}>Log Out</button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  )
}

export default App
