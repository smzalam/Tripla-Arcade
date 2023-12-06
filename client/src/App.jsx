import SettingsProvider from "./context/SettingsContext";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <div className="w-screen h-screen">
      <div className="h-screen w-screen grid auto-cols-auto grid-cols-1 grid-rows-1 justify-center align-center justify-items-center align-items-center">
        <SettingsProvider>
          <Dashboard />
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
