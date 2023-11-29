/* eslint-disable react/prop-types */
const SignUpButton = ({ setShowForm }) => {
    return (
        <button
            onClick={() => {
                setShowForm('signup')
            }}
            className="bg-yellow-500 hover:bg-lavender p-3 px-[100px] rounded-md h-max w-[500px] row-start-2 place-self-top">
            Sign Up
        </button>
    )
}

export default SignUpButton