/* eslint-disable react/prop-types */
import SignUp from './Forms/SignUp'
import Login from './Forms/Login'

function ShowForm({ setModal, showForm, setShowForm }) {
    if (showForm === 'login') {
        return (
            <div className='grid grid-rows-3'>
                <div className='row-start-2 row-span-2'>
                    <Login setModal={setModal}></Login>
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
                    <SignUp setModal={setModal}></SignUp>
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

export default ShowForm;
