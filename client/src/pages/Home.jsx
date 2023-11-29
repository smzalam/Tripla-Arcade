import { useState } from 'react';
import LogInButton from '../components/LogInButton';
import ShowForm from '../components/ShowForm';
import SignUpButton from '../components/SignUpButton';
import { useUserContext } from "../context/AuthContext";

const Home = () => {
  const { setIsAuth } = useUserContext();

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="grid grid-cols-2 row-start-2 row-span-6">
            <div className="h-max text-white text-9xl p-3 px-10">
              Competitive fun at its simplest.
            </div>
            {showForm ? (
              <>
                <ShowForm
                  showForm={showForm}
                  setIsAuth={setIsAuth}
                  setShowForm={setShowForm}>
                </ShowForm>
              </>
            ) : (
              <div className="grid grid-rows-2 justify-center align-center">
                <LogInButton setShowForm={ setShowForm } />
                <SignUpButton setShowForm={ setShowForm} />
              </div>
            )}
          </div>
  )
}

export default Home;