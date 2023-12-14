/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
    const [isTimer, setIsTimer] = useState(false);
    const [isWalls, setIsWalls] = useState(false);
    const [isPowerUps, setIsPowerUps] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
      let currentMode = darkMode ? 'light' : 'dark'
      let previousMode = darkMode ? 'dark' : 'light'
      document.documentElement.classList.add(currentMode)
      document.documentElement.classList.remove(previousMode)
    }, [darkMode])
    
    console.log('TIMER: ', isTimer)
    console.log('WALLS: ', isWalls)
    console.log('POWERUPS: ', isPowerUps)

    const timerSetting = () => {
        setIsTimer(!isTimer)
    }
    const wallsSetting = () => {
        setIsWalls(!isWalls)
    }
    const powerUpsSetting = () => {
        setIsPowerUps(!isPowerUps)
    }
    const darkModeSetting = () => {
        setDarkMode(!darkMode)
    }

    const value = {
        timerSetting,
        wallsSetting,
        powerUpsSetting,
        darkModeSetting,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;
export const useSettingsContext = () => useContext(SettingsContext);