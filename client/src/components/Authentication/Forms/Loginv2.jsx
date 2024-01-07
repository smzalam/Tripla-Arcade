import { useRef, useState, useEffect } from 'react';
import { useAuthContext } from '../../../context/AuthContext';

import { api } from '../../../lib/api/axios';
const LOGIN_URL = '/auth/login';

const Login = ({ setAuthMode }) => {
    const { setAuth, setIsAuth } = useAuthContext();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            sessionStorage.setItem('user', user)
            setAuth({ user, roles, accessToken });
            setIsAuth(true);
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <div className='h-full w-full flex justify-center place-items-center'>
                    <section
                        className='text-text w-max h-max flex flex-col p-10 place-items-center justify-center bg-secondary rounded-lg'
                    >
                        <p ref={errRef} className={errMsg ? "bg-pink-400 text-[#b22222] font-bold p-[0.5rem] mb-[0.5rem]" : "absolute -left-[9999px]"} aria-live="assertive">{errMsg}</p>
                        <h1 className='text-3xl mb-6 text-primary font-bold'>Login</h1>
                        <form
                            onSubmit={handleSubmit}
                            className='flex flex-col w-max justify-evenly place-items-center pb-4'
                        >
                            <label htmlFor="username" className='text-primary font-bold'>
                                Username:
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    className='p-1 rounded-lg text-xl m-4'

                                />
                            </label>
                            <label htmlFor="password" className='text-primary font-bold'>
                                Password:
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    className='p-1 rounded-lg text-xl m-4'
                                />
                            </label>
                            <button
                                className='mt-4 py-2 rounded-lg text-xl bg-primary px-10'
                            >
                                Sign In
                            </button>
                        </form>
                        <p className='group text-primary flex flex-row place-items-center gap-4 mt-6'>
                            Need an Account?<br />
                            <span className="inline-block">
                                <button
                                    className='bg-accent rounded-lg px-3 py-2 group-hover:text-white'
                                    onClick={() => { setAuthMode('register') }}
                                >
                                    Sign Up
                                </button>
                            </span>
                        </p>
                    </section>
                </div>
            )}
        </>
    )
}

export default Login