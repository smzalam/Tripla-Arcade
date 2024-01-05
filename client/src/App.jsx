import GameProvider from "./context/GameContext";
import NavigationProvider from "./context/NavigationContext";
import SettingsProvider from "./context/SettingsContext";
import AuthProvider from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";


function App() {

  return (
    <div className="h-screen w-screen grid grid-cols-1 grid-rows-1 overflow-hidden">
      <AuthProvider>
        <SettingsProvider>
          <NavigationProvider>
            <GameProvider>
              <Dashboard />
            </GameProvider>
          </NavigationProvider>
        </SettingsProvider>
      </AuthProvider>
    </div>
  )
}

export default App
