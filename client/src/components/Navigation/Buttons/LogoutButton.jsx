import classNames from "classnames"

import { api } from '../../../lib/api/axios';
import { useAuthContext } from "../../../context/AuthContext";
const LOGOUT_URL = '/auth/logout';

const LogoutButton = ({ isActive, setIsActive, url, Icon, imageAlt }) => {

    const {setIsAuth, setAuth} = useAuthContext();
    return (
        <button
            onClick={
                async () => {
                    const response = await api.get(LOGOUT_URL,
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true
                        }
                    );
                    console.log(JSON.stringify(response?.data));
                    setIsAuth(false);
                    setAuth({});
                    sessionStorage.removeItem('user');

                    setIsActive(url);
                }
            }
            className=
            {
                classNames(
                    'hover:bg-primary hover:rounded-lg group flex flex-col transition-all duration-500 flex-initial justify-center place-items-center h-full w-full',
                    // {
                    //     'bg-secondary rounded-lg': isActive === url
                    // },
                    // {
                    //     'hover:bg-primary hover:rounded-lg': isActive !== url
                    // }
                )
            }
        >
            <Icon className={
                classNames(
                    'text-secondary w-16 h-16 pt-2',
                    // {
                    //     'text-secondary': isActive !== url
                    // }
                )
            } />
            <span className={
                classNames(
                    "max-w-0 whitespace-nowrap overflow-hidden transition-all duration-1000 ease-in-out group-hover:max-w-md group-hover:p-2 ",
                    {
                        'max-w-md text-white p-2': isActive === url
                    },
                    {
                        'text-nav': isActive !== url
                    }
                )
            }>
                {imageAlt}
            </span>
        </button>
    )
}

export default LogoutButton