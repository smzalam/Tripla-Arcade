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
        <div className='login'>
            <label htmlFor="">Login</label>
            <input placeholder="User Name" onChange={(event) => { setUserName(event.target.value) }} />
            <input placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login
