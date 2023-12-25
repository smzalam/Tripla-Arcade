/* eslint-disable react/prop-types */
const LogInButton = ({ setShowForm }) => {
    return (
        <button
            onClick={() => {
                setShowForm('login');
            }}
            className="bg-black hover:bg-lavender text-white hover:text-black rounded-md p-3 px-[100px] mb-3 h-max w-[500px] row-start-1 row-end-2 place-self-end">
            Log In
        </button>
    )
}

export default LogInButton