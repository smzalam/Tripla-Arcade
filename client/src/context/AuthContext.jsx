/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "universal-cookie";
// import { connectCurrentUser, disconnectCurrentUser } from "../lib/steam/api";
import { api } from '../lib/api/axios';
const REFRESH_TOKEN_URL = '/auth/refresh';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [auth, setAuth] = useState({})

    useEffect(() => {
        console.log('YES')
        if (sessionStorage.getItem('user')) {
            console.log('YES')
            setIsAuth(true);
            api.get(REFRESH_TOKEN_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ).then((response) => {
                console.log(JSON.stringify(response?.data));
                const user = sessionStorage.getItem('user');
                const accessToken = response?.data?.accessToken;
                setAuth({ user, accessToken })
            });
        }
    }, [])

    // const cookies = new Cookies();

    // const login = () => {
    // try {
    //     const token = cookies.get("token");
    //     const user = {
    //         id: cookies.get("userID"),
    //         name: cookies.get("username"),
    //         firstName: cookies.get('firstName'),
    //         lastName: cookies.get('lastName'),
    //         hashedPassword: cookies.get("hashedPassword")
    //     }
    //     connectCurrentUser(user, token).then((result) => {
    //         if (result) {
    //             setIsAuth(true);
    //         }
    //     });
    // } catch (error) {
    //     console.log(error);
    //     return false;
    // }
    // }
    // const logout = () => {
    // cookies.remove("token");
    // cookies.remove("userID");
    // cookies.remove("firstName");
    // cookies.remove("lastName");
    // cookies.remove("hashedPassword");
    // cookies.remove("channelName");
    // cookies.remove("username");
    // disconnectCurrentUser().then(() => { setIsAuth(false) });
    // }

    const value = {
        // cookies,
        isAuth,
        setIsAuth,
        auth,
        setAuth,
        // logout,
        // login,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuthContext = () => useContext(AuthContext);