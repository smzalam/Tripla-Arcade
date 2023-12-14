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
}

export default App
