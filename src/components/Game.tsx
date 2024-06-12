import React, { useState } from 'react';
import '../styles/game.scss';
import iconX from '../assets/icon-x.svg';
import iconO from '../assets/icon-o.svg';
import iconRestart from '../assets/icon-restart.svg';
import ThemedButton from './ThemeButton';
import Dialog from './Dialog'; // Ensure this import is correct

interface GameProps {
  restartGame: () => void;
}

const Game: React.FC<GameProps> = ({ restartGame }) => {
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [board, setBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const switchPlayer = (index: number) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleRestartConfirm = () => {
    restartGame();
    closeDialog();
  };

  return (
    <div className='game'>
      <header className='game-header'>
        <div className='player-indicator'>
          <img src={iconX} alt='X' className='icon' />
          <img src={iconO} alt='O' className='icon' />
        </div>
        <div className='turn-indicator'>
          {currentPlayer === 'X' ? (
            <svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' className='turn-indicator-icon'>
              <path transform='scale(0.25)' d='M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z' fill-rule='evenodd' />
            </svg>
          ) : (
            <svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' className='turn-indicator-icon'>
              <path transform='scale(0.25)' d='M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z' />
            </svg>
          )}
          <span>TURN</span>
        </div>
        <div className='button-container'>
          <ThemedButton onClick={openDialog} variant='tertiary'>
            <img src={iconRestart} alt='Restart' className='icon restart' />
          </ThemedButton>
        </div>
      </header>
      <main className='board'>
        {board.map((value, index) => (
          <button key={index} type='button' className={`square ${value ? 'occupied' : `${currentPlayer.toLowerCase()}-hover`}`} onClick={() => switchPlayer(index)} title={`Square ${index + 1}`}>
            {value && <img src={value === 'X' ? iconX : iconO} alt={value} />}
          </button>
        ))}
      </main>
      <footer className='game-footer'>
        <div className='score x-score'>
          <span>X (YOU)</span>
          <span>14</span>
        </div>
        <div className='score ties-score'>
          <span>TIES</span>
          <span>32</span>
        </div>
        <div className='score o-score'>
          <span>O (CPU)</span>
          <span>11</span>
        </div>
      </footer>
      <Dialog
        message='Restart Game?'
        confirmText='Yes, Restart'
        cancelText='No, Cancel'
        onConfirm={handleRestartConfirm}
        onCancel={closeDialog}
        isOpen={isDialogOpen}
        closeOnBackgroundClick={true} // Add this prop
      />
    </div>
  );
};

export default Game;
