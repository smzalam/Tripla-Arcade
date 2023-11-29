import { useEffect, useState } from "react";
import Navigation from "./pages/Navigations/Navigation";
import NavMenu from "./components/NavMenu";
import { useUserContext } from "./context/AuthContext";

function App() {
  const {isAuth} = useUserContext();
  const [isActive, setIsActive] = useState('/');

  useEffect(() => {
    console.log(isActive)
  }, [isActive])

  return (
    <div className="w-screen h-screen">
      <div className="bg-text w-screen h-screen grid grid-rows-6">
        <NavMenu setIsActive={setIsActive} />
        <Navigation isActive={isActive} isAuth={isAuth}/>
        {/* {isAuth ? (
          <Home isActive={isActive} />
        ) : (
          <>
            <button data-open-modal></button>
            <dialog data-modal></dialog>
            <HomeAuth />
          </>
        )
        } */}
      </div>
    </div>
  )
}

export default App
