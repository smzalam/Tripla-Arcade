import { useState } from "react";
// import Navigation from "./pages/Navigations/Navigation";
// import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useUserContext } from "./context/AuthContext";
import SettingsProvider from "./context/SettingsContext";

function App() {
  const { isAuth } = useUserContext();
  const [isActive, setIsActive] = useState('/');

  return (
    <div className="w-screen h-screen">
      <div className="h-screen w-screen grid auto-cols-auto grid-cols-1 grid-rows-[0.7fr_3.6fr_0.7fr] justify-center align-center justify-items-center align-items-center">
        <SettingsProvider>
          <Header />
          <div>No</div>
          <Footer />
        </SettingsProvider>
      </div>
    </div>
  )
  // return (
  //   <div className="w-screen h-screen">
  //     <div className="bg-text w-screen h-screen grid grid-rows-6">
  //       <NavMenu setIsActive={setIsActive} />
  //       <Navigation isActive={isActive} isAuth={isAuth}/>
  //     </div>
  //   </div>
  // )
}

export default App
