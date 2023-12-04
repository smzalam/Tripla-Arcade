/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
    const [isTimer, setIsTimer] = useState(false);
    const [isWalls, setIsWalls] = useState(false);
    const [isPowerUps, setIsPowerUps] = useState(false);
    
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

    const value = {
        timerSetting,
        wallsSetting,
        powerUpsSetting,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;
export const useSettingsContext = () => useContext(SettingsContext);