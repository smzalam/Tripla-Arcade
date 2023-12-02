/* eslint-disable react/prop-types */
import { useState } from 'react';
import IMAGES from '../assets/images/images';
import { useUserContext } from '../context/AuthContext';
import AuthModal from './AuthModal';
import { NavItems } from './Navigation/NavItems';
import NavButtons from './Buttons/NavButtons';

function NavMenu({ setIsActive }) {
    const { cookies, logout, isAuth } = useUserContext();
    const [modal, setModal] = useState(false);

    return (
        <div className={`bg-headings grid grid-cols-4`}>
            <div
                className="font-title text-lavender text-6xl col-start-1 col-end-4 justify-self-center place-self-center">
                <button
                    onClick={() => { setIsActive('/') }}
                >
                    tripla arcade
                </button>
            </div>
            <div className={`grid grid-cols-4`}>
                {NavItems.map((item) => (
                    <NavButtons
                        key={item.name}
                        setIsActive={setIsActive}
                        url={item.url}
                        imageSrc={item.imageSrc}
                        imageAlt={item.imageAlt}
                    />
                ))}
                {isAuth ? (
                    <button
                        onClick={
                            () => {
                                logout(cookies);
                                setIsActive('/')
                            }
                        }
                        className='hover:bg-lavender focus:bg-black grid'>
                        <img
                            src={IMAGES.logoutIcon}
                            alt="Logout"
                            className='max-w-iconSize grid justify-self-center place-self-center' />
                    </button>
                ) : (
                    <>
                        <AuthModal modal={modal} setModal={setModal} />
                        <button
                            onClick={
                                () => {
                                    setModal(true)
                                }
                            }
                            className='hover:bg-lavender focus:bg-black grid'>
                            <img
                                src={IMAGES.logoutIcon}
                                alt="Login"
                                className='max-w-iconSize grid justify-self-center place-self-center' />
                        </button>
                    </>
                )}
            </div>
        </div >
    )
}

export default NavMenu
