import { useRef, useState, useEffect } from 'react';
import { api } from '../../../lib/api/axios';
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = ({ setAuthMode }) => {

    const userRef = useRef();
    const errRef = useRef();
    const REGISTER_URL = '/auth/register';

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd);

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        // console.log(user);
        // setSuccess(true);

        try {
            const response = await api.post(
                REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true

                }
            );

            console.log(response.data)
            setUser('');
            setPwd('');
            setMatchPwd('');
            setAuthMode('login');
            setSuccess(true);
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response')
            } else if (errMsg.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Registration Failed')
            }

            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <div className='h-full w-full flex justify-center place-items-center'>
                    <section
                        className='w-max h-max flex flex-col p-10 place-items-center justify-center bg-secondary rounded-lg'
                    >
                        <p
                            ref={errRef}
                            className={errMsg ? "bg-pink-400 text-[#b22222] font-bold p-[0.5rem] mb-[0.5rem]" : "absolute -left-[9999px]"}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
                        <h1 className='text-3xl mb-6 text-primary font-bold'>Register</h1>
                        <form
                            onSubmit={handleSubmit}
                            className='text-primary font-bold flex flex-col w-max justify-evenly place-items-center pb-4'
                        >
                            <label htmlFor="username" className='flex flex-row justify-center place-items-center'>
                                Username:
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    className='p-1 rounded-lg text-xl m-4'
                                />
                                <CheckCircleIcon className={validName ? "text-accent w-12 h-12 ml-1" : "hidden"} />
                                <XCircleIcon className={validName || !user ? "hidden" : "text-red-500 ml-1 w-12 h-12"} />
                            </label>
                            <p id="uidnote" className={userFocus && user && !validName ? "mr-1 bg-primary rounded-lg text-text p-4 flex flex-row place-items-center gap-3" : "absolute -left-[9999px]"}>
                                <InformationCircleIcon className='w-12 h-12' />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            <label htmlFor="password" className='flex flex-row justify-center place-items-center'>
                                Password:
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    className='p-1 rounded-lg text-xl m-4'
                                />
                                <CheckCircleIcon className={validPwd ? "text-[#32cd32] ml-1 w-12 h-12" : "hidden"} />
                                <XCircleIcon className={validPwd || !pwd ? "hidden" : "text-red-500 ml-1 w-12 h-12"} />
                            </label>
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "mr-1 bg-primary rounded-lg text-text p-4 flex flex-row place-items-center gap-3" : "absolute -left-[9999px]"}>
                                <InformationCircleIcon className='w-12 h-12' />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>


                            <label htmlFor="confirm_pwd" className='flex flex-row justify-center place-items-center'>
                                Confirm Password:
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    className='p-1 rounded-lg text-xl m-4'
                                />
                                <CheckCircleIcon className={validMatch && matchPwd ? "text-[#32cd32] ml-1 w-12 h-12" : "hidden"} />
                                <XCircleIcon className={validMatch || !matchPwd ? "hidden" : "text-red-500 ml-1 w-12 h-12"} />
                            </label>

                            <p id="confirmnote" className={matchFocus && !validMatch ? "mr-1 bg-primary rounded-lg text-text p-4 flex flex-row place-items-center gap-3" : "absolute -left-[9999px]"}>
                                <InformationCircleIcon className='w-12 h-12' />
                                Must match the first password input field.
                            </p>

                            <button
                                disabled={!validName || !validPwd || !validMatch ? true : false}
                                className='text-text mt-4 py-2 rounded-lg text-xl bg-primary px-10'
                            >Sign Up</button>
                        </form>
                        <p className='group text-primary flex flex-row place-items-center gap-4 mt-6'>
                            Already registered? <br />
                            <span className='inline-block'>
                                <button
                                    className='bg-accent rounded-lg px-3 py-2 group-hover:text-white'
                                    onClick={() => { setAuthMode('login') }}
                                >
                                    Login
                                </button>
                            </span>
                        </p>
                    </section>
                </div>
            )}
        </>
    )
}

export default Register