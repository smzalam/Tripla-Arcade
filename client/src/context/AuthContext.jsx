/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";
import { connectCurrentUser, disconnectCurrentUser } from "../lib/steam/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    const cookies = new Cookies();

    const login = () => {
        try {
            const token = cookies.get("token");
            const user = {
                id: cookies.get("userID"),
                name: cookies.get("username"),
                firstName: cookies.get('firstName'),
                lastName: cookies.get('lastName'),
                hashedPassword: cookies.get("hashedPassword")
            }
            connectCurrentUser(user, token).then((result) => {
                if (result) {
                    setIsAuth(true);
                }
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    const logout = () => {
        cookies.remove("token");
        cookies.remove("userID");
        cookies.remove("firstName");
        cookies.remove("lastName");
        cookies.remove("hashedPassword");
        cookies.remove("channelName");
        cookies.remove("username");
        disconnectCurrentUser().then(() => { setIsAuth(false) });
    }

    const value = {
        cookies,
        isAuth,
        setIsAuth,
        logout,
        login
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);