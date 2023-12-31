
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const GuideSearchBar = ({ games, setSearchResults }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(games)

        const resultsArray = games.filter(game => game.game.includes(e.target.value) || game.category.includes(e.target.value) || game.type.includes(e.target.value))
    
        setSearchResults(resultsArray)
    }

    return (
        <form
            className="w-[80%] h-max place-self-center bg-accent rounded-2xl text-[1rem] flex flex-row"
            onSubmit={handleSubmit}
        >
            <MagnifyingGlassIcon className='m-4 h-12 w-12 text-primary place-self-center' />
            <input
                className="block w-full appearance-none bg-transparent rounded-2xl focus:outline-none text-7xl text-primary placeholder:text-background transition sm:text-[0.8125rem] sm:leading-6 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
                type="search"
                placeholder='Search for game or category...'
                onChange={handleSearchChange}
            />
            {/* <button
                className="w-[15%] h-full pr-2 text-gray-50 grid place-self-center bg-transparent border-none outline-none"
            >
                Search
            </button> */}
        </form>
    )
}

export default GuideSearchBar