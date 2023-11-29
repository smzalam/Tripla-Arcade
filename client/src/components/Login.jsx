import Axios from "axios";
import { useState } from "react";
import { useUserContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
function Login({ setModal }) {

    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const { cookies, login } = useUserContext();
    const onSubmit = () => {
        try {
            console.log('ok')
            Axios.post("http://localhost:3001/login", { userName, password }).then(res => {
                console.log('SUCCESSFUL')
                const { firstName, lastName, userName, token, userID } = res.data;
                cookies.set("userID", userID);
                cookies.set("username", userName);
                cookies.set("firstName", firstName);
                cookies.set("lastName", lastName);
                cookies.set("token", token);
            }).then(() => {login()})

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
                onClick={
                    () => {
                        onSubmit();
                        setModal(false);
                    }
                }
                className="bg-yellow-500 hover:bg-lavender p-7 rounded-md w-max h-full">
                Login
            </button>
        </div>
    )
}

export default Login
