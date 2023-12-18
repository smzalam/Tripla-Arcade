import GameProvider from "./context/GameContext";
import NavigationProvider from "./context/NavigationContext";
import SettingsProvider from "./context/SettingsContext";
import Dashboard from "./pages/Dashboard";


function App() {

  return (
    <div className="h-screen w-screen grid grid-cols-1 grid-rows-1">
      <SettingsProvider>
        <NavigationProvider>
          <GameProvider>
            <Dashboard />
          </GameProvider>
        </NavigationProvider>
      </SettingsProvider>
    </div>
  )
}

export default App
