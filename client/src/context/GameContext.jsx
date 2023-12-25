/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
const socket = io.connect({ autoConnect: false })
const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [room, setRoom] = useState('');
  const gameRoom = useRef('')
  useEffect(() => {
    gameRoom.current = room
  }, [room])

  useEffect(() => {
    const sessionID = sessionStorage.getItem('sessionID')
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    } else {
      socket.connect()
    }

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      sessionStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    });

    socket.on('connect', () => {
      console.log('Yo')
    })

    return () => {
      socket.off('connect', () => {
        console.log('Yo')
      })
      socket.off("session", ({ sessionID, userID }) => {
        // attach the session ID to the next reconnection attempts
        socket.auth = { sessionID };
        // store it in the localStorage
        localStorage.setItem("sessionID", sessionID);
        // save the ID of the user
        socket.userID = userID;
      });
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