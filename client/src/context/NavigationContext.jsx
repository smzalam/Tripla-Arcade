/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
    const [isActive, setIsActive] = useState('/');

    const value = {
        isActive,
        setIsActive,
    };

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationProvider;
export const useNavigationContext = () => useContext(NavigationContext);