
const Home = ({ isActive, setIsActive }) => {

  return (
    <div className={`bg-background grid`}>
      <div
        className="font-heading text-text text-7xl col-start-1 col-end-4 justify-self-center place-self-center">
        <button
        className="pr-3 pl-3"
          onClick={() => { setIsActive('/') }}
        >
        {isActive === '/' ? 'tripla arcade' : 'tripla'}
        </button>
      </div>
      {/* // <div className="grid grid-rows-3 row-start-2 row-span-6">
        <div className="grid place-items-center h-max text-center row-span-2 text-white text-7xl p-3 px-10">
          <text>Competitive fun at its simplest.</text>
        </div>
        <div className="grid grid-cols-2 h-max text-white p-3 px-10">
          <div className="grid justify-center align-middle">
            <button
              onClick={() => { setModal(true) }}
            >
              Sign In
            </button>
            <AuthModal modal={modal} setModal={setModal} />
          </div>
          <div className='grid justify-center align-middle'>
            <button>
              Check out our games collection!
            </button>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Home;