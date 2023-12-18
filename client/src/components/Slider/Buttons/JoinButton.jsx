import { useNavigationContext } from "../../../context/NavigationContext"

const JoinButton = () => {

    const {setIsActive} = useNavigationContext();

    return (
        <button
            onClick={() => {setIsActive('/join')}}
            className="cursor-pointer bg-background rounded-md h-max w-max text-text px-10 py-2 text-2xl"
        >
            Join!
        </button>
    )
}

export default JoinButton