import { useState } from "react";
import Axios from "axios";
import { useUserContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
function SignUp({ setModal }) {
    const [user, setUser] = useState(null)
    const { cookies, login } = useUserContext();


    const onSubmit = () => {
        try {
            Axios.post("http://localhost:3001/signup", user).then(res => {
                const { token, userID, firstName, lastName, userName, hashedPassword } = res.data;
                cookies.set("token", token);
                cookies.set("userID", userID);
                cookies.set("firstName", firstName);
                cookies.set("lastName", lastName);
                cookies.set("username", userName);
                cookies.set("hashedPassword", hashedPassword);
            }).then(() => {login()})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='row-start-2 align-self-center border-0 grid grid-cols-3'>
            {/* <label htmlFor="">Sign Up</label> */}
            <div className="col-span-2 grid grid-rows-3">
                <div className="grid grid-cols-2 mb-2">
                    <input
                        placeholder="First Name"
                        onChange={
                            (event) => {
                                setUser({ ...user, firstName: event.target.value })
                            }
                        }
                        className="bg-white rounded-full w-7/8 p-3 place-self-center" />
                    <input
                        placeholder="Last Name"
                        onChange={
                            (event) => {
                                setUser({ ...user, lastName: event.target.value })
                            }
                        }
                        className="bg-white rounded-full w-7/8 p-3 place-self-center" />
                </div>
                <input
                    placeholder="User Name"
                    onChange={
                        (event) => {
                            setUser({ ...user, userName: event.target.value })
                        }
                    }
                    className="bg-white rounded-full my-2 p-3" />
                <input
                    placeholder="Password"
                    onChange={
                        (event) => {
                            setUser({ ...user, password: event.target.value })
                        }
                    }
                    className="bg-white rounded-full my-2 p-3" />
            </div>
            <button
                onClick={
                    () => {
                        onSubmit();
                        setModal(false);
                    }
                }
                className="bg-yellow-500 hover:bg-lavender p-7 rounded-md w-max h-full ml-2">
                Sign Up
            </button>
        </div>
    )
}

export default SignUp
