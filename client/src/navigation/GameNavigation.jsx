import { useSettingsContext } from '../context/SettingsContext';
import TicTacToeGame from '../pages/Games/TicTacToeGame'
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
      {inGame === 'TicTacToe' && <TicTacToeGame key={inGame} deactivateGame={deactivateGame} />}
      {inGame === 'QuicQuakQuad' && <TicTacToeGame key={inGame} deactivateGame={deactivateGame} />}
      {inGame === 'TypeRacer' && <TicTacToeGame key={inGame} deactivateGame={deactivateGame} />}
    </motion.div>
    // <div className='bg-secondary text-black'>
    //   <WaitingScreen deactivateGame={deactivateGame} />
    // </div>
  )
}

export default Game