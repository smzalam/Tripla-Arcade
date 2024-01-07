import { useState } from "react";
import Login from "../components/Authentication/Forms/Loginv2";
import Register from "../components/Authentication/Forms/Register";

const AccountForms = () => {

    const [authMode, setAuthMode] = useState('login');

    return (
        <>
            {authMode === 'login' && <Login setAuthMode={setAuthMode} />}
            {authMode === 'register' && <Register setAuthMode={setAuthMode} />}
        </>
    )
}

export default AccountForms