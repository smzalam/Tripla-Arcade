/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
const socket = io.connect("http://localhost:3001")
const GameContext = createContext();

const GameProvider = ({ children }) => {
    const [room, setRoom] = useState('');
    const gameRoom = useRef('')

    useEffect(() => {
      gameRoom.current = room
    }, [room])

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
        room,
        gameRoom,
        setRoom
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
export const useGameContext = () => useContext(GameContext);