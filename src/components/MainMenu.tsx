import { forwardRef } from 'react';
import logo from '../assets/logo.svg';
import '../styles/mainMenu.scss';
import useLocalStorage from '../hooks/useLocalStorage';

interface MainMenuProps {
  startGame: (mode: 'cpu' | 'player', choice: 'X' | 'O') => void;
}

const MainMenu = forwardRef<HTMLDivElement, MainMenuProps>(({ startGame }, ref) => {
  const [playerChoice, setPlayerChoice] = useLocalStorage<'X' | 'O'>('playerChoice', 'X');

  const handlePlayerChoice = (choice: 'X' | 'O') => {
    setPlayerChoice(choice);
  };

  return (
    <div className='main-menu' ref={ref}>
      <img src={logo} alt='Tic Tac Toe Logo' className='logo' />
      <div className='picker'>
        <span>Pick Player 1's Mark</span>
        <div className='options'>
          <button type='button' className={`option ${playerChoice === 'X' ? 'selected' : ''}`} onClick={() => handlePlayerChoice('X')} title='Select X'>
            <svg width='32' height='32' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
              <path d='M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z' fillRule='evenodd' />
            </svg>
          </button>
          <button type='button' className={`option ${playerChoice === 'O' ? 'selected' : ''}`} onClick={() => handlePlayerChoice('O')} title='Select O'>
            <svg width='32' height='32' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
              <path d='M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z' />
            </svg>
          </button>
        </div>
        <span>Remember: X Goes First</span>
      </div>
      <button type='button' className='btn primary' onClick={() => startGame('cpu', playerChoice)}>
        New Game (VS CPU)
      </button>
      <button type='button' className='btn secondary' onClick={() => startGame('player', playerChoice)}>
        New Game (VS Player)
      </button>
    </div>
  );
});

export default MainMenu;
