import { useState } from 'react'

function Login() {

    const [userName, setUserName] = useState(null)
    const [password, setPassword] = useState(null)
    const login = () => { }

    return (
        <div className='login'>
            <label htmlFor="">Login</label>
            <input placeholder="User Name" onChange={(event) => { setUserName(event.target.value) }} />
            <input placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
            <button onClick={login()}>Login</button>
        </div>
    )
}

export default Login
