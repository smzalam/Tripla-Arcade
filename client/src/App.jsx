import { useState } from "react";
import Navigation from "./pages/Navigations/Navigation";
import NavMenu from "./components/NavMenu";
import { useUserContext } from "./context/AuthContext";

function App() {
  const {isAuth} = useUserContext();
  const [isActive, setIsActive] = useState('/');

  return (
    <div className="w-screen h-screen">
      <div className="bg-text w-screen h-screen grid grid-rows-6">
        <NavMenu setIsActive={setIsActive} />
        <Navigation isActive={isActive} isAuth={isAuth}/>
      </div>
    </div>
  )
}

export default App
