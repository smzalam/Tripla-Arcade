import { useSettingsContext } from '../../context/SettingsContext';
import TicTacToeGame from '../Games/TicTacToeGame'
import Connect4Game from '../Games/Connect4Game'
import MiniKahootGame from '../Games/MiniKahootGame'

const Game = ({ deactivateGame, room }) => {

  const { inGame } = useSettingsContext();

  return (
    <>
      {inGame === 'TicTacToe' && <TicTacToeGame deactivateGame={deactivateGame} room={room} />}
      {inGame === 'QuicQuakQuad' && <Connect4Game />}
      {inGame === 'TypeRacer' && <MiniKahootGame />}
    </>
    // <div className='bg-secondary text-black'>
    //   <WaitingScreen deactivateGame={deactivateGame} />
    // </div>
  )
}

export default Game