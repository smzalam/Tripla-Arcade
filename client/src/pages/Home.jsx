import { useState } from "react";
import AuthModal from "../components/AuthModal";

const Home = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="grid grid-rows-3 row-start-2 row-span-6">
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
    </div>
  )
}

export default Home;