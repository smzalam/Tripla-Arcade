import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

// eslint-disable-next-line react/prop-types
function SignUp({ setIsAuth }) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null)

    const signUp = () => {
        try {
            Axios.post("http://localhost:3001/signup", user).then(res => {
                const { token, userID, firstName, lastName, userName, hashedPassword } = res.data;
                cookies.set("token", token);
                cookies.set("userID", userID);
                cookies.set("firstName", firstName);
                cookies.set("lastName", lastName);
                cookies.set("username", userName);
                cookies.set("hashedPassword", hashedPassword);
                setIsAuth(true);
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='signUp'>
            <label htmlFor="">Sign Up</label>
            <input placeholder="First Name" onChange={(event) => { setUser({ ...user, firstName: event.target.value }) }} />
            <input placeholder="Last Name" onChange={(event) => { setUser({ ...user, lastName: event.target.value }) }} />
            <input placeholder="User Name" onChange={(event) => { setUser({ ...user, userName: event.target.value }) }} />
            <input placeholder="Password" onChange={(event) => { setUser({ ...user, password: event.target.value }) }} />
            <button onClick={signUp}>Sign Up</button>
        </div>
    )
}

export default SignUp
