import { useSettingsContext } from '../context/SettingsContext';
import TicTacToeGame from '../pages/Games/TicTacToeGame'
import Connect4Game from '../pages/Games/Connect4Game'
import MiniKahootGame from '../pages/Games/MiniKahootGame'
import { motion } from 'framer-motion';

const Game = ({ deactivateGame }) => {

  const { inGame } = useSettingsContext();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.5 }}
      className='bg-secondary text-text'
    >
      {inGame === 'TicTacToe' && <TicTacToeGame key={'TicTacToeGame'} deactivateGame={deactivateGame} />}
      {inGame === 'QuicQuakQuad' && <Connect4Game key={'Connect4Game'} />}
      {inGame === 'TypeRacer' && <MiniKahootGame key={'MiniKahootGame'} />}
    </motion.div>
    // <div className='bg-secondary text-black'>
    //   <WaitingScreen deactivateGame={deactivateGame} />
    // </div>
  )
}

export default Game