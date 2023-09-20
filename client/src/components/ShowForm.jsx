/* eslint-disable react/prop-types */
import SignUp from './SignUp'
import Login from './Login'

function ShowForm({ showForm, setIsAuth, setShowForm }) {
    if (showForm === 'login') {
        return (
            <div className='grid grid-rows-3'>
                <div className='row-start-2 row-span-2'>
                    <Login setIsAuth={setIsAuth}></Login>
                    <button
                        onClick={() => {
                            setShowForm('signup')
                        }}
                        className="bg-yellow-500 hover:bg-lavender p-3 px-[100px] m-3 rounded-md h-max w-[500px] row-start-3 place-self-top">
                        No existing account? Sign Up
                    </button>
                </div>
            </div>
        )
    }

    if (showForm === 'signup') {
        return (
            <div className='grid grid-rows-3'>
                <div className='row-start-2 row-span-2'>
                    <SignUp setIsAuth={setIsAuth}></SignUp>
                    <button
                        onClick={() => {
                            setShowForm('login');
                        }}
                        className="bg-yellow-500 hover:bg-lavender p-3 px-[100px] m-3 rounded-md h-max w-[500px] row-start-3 place-self-top">
                        Already have an account? Log In
                    </button>
                </div>
            </div >
        )
    }
}

export default ShowForm
