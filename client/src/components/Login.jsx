import { useState } from "react";
import Cookies from "universal-cookie";
import Axios from "axios";

// eslint-disable-next-line react/prop-types
function Login({ setIsAuth }) {

    const cookies = new Cookies();
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const login = () => {
        try {
            Axios.post("http://localhost:3001/login", { userName, password }).then(res => {
                const { firstName, lastName, userName, token, userID } = res.data;
                cookies.set("token", token);
                cookies.set("userID", userID);
                cookies.set("username", userName);
                cookies.set("firstName", firstName);
                cookies.set("lastName", lastName);
                setIsAuth(true);
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='align-self-center border-0 grid grid-cols-3'>
            {/* <label htmlFor="">Login</label> */}
            <div className="col-span-2 grid grid-rows w-full">
                <input
                    placeholder="User Name"
                    onChange={(event) => { setUserName(event.target.value) }}
                    className="bg-white rounded-full h-max p-5 m-2"
                />
                <input
                    placeholder="Password"
                    onChange={(event) => { setPassword(event.target.value) }}
                    className="bg-white rounded-full h-max p-5 m-2"
                />
            </div>
            <button
                onClick={login}
                className="bg-yellow-500 hover:bg-lavender p-7 rounded-md w-max h-full">
                Login
            </button>
        </div>
    )
}

export default Login
