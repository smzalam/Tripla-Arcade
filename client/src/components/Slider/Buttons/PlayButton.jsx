const PlayButton = ({ activateGame, game }) => {

    return (
        <button
            onClick={() => {
                activateGame(game)
            }}
            className="cursor-pointer bg-background rounded-md h-max w-max text-text px-10 py-2 text-2xl"
        >
            Play!
        </button>
    )
}

export default PlayButton