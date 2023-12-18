/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { io } from 'socket.io-client';
const socket = io.connect("http://localhost:3001")
const GameContext = createContext();

const GameProvider = ({ children }) => {
    
    useEffect(() => {
        socket.on('connect', () => {
          console.log('Yo')
        })
        return () => {
          socket.off('connect')
        }
      }, [])

    const value = {
        socket,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
export const useGameContext = () => useContext(GameContext);