import React, { useEffect, useState, forwardRef } from 'react';
import '../styles/game.scss';
import iconX from '../assets/icon-x.svg';
import iconO from '../assets/icon-o.svg';
import iconXDark from '../assets/icon-x-dark.svg';
import iconODark from '../assets/icon-o-dark.svg';
import iconRestart from '../assets/icon-restart.svg';
import Dialog from './Dialog';
import ThemedButton from './ThemeButton';
import { useGameLogic } from '../hooks/useGameLogic';
import { useDialog } from '../hooks/useDialog';
import { useScoreTracker } from '../hooks/useScoreTracker';
import { useCpuLogic } from '../hooks/useCpuLogic';

interface GameProps {
  restartGame: () => void;
  playerChoice: 'X' | 'O';
  gameMode: 'cpu' | 'player';
}

const Game = forwardRef<HTMLDivElement, GameProps>(({ restartGame, playerChoice, gameMode }, ref) => {
  const { currentPlayer, setCurrentPlayer, board, setBoard, winner, winningSquares, isGameOver, handleSquareClick, resetBoard } = useGameLogic({ playerChoice });

  const { isDialogOpen, dialogMessage, confirmText, cancelText, dialogWinner, isRestartDialog, openDialog, closeDialog } = useDialog();

  const { scores, updateScore } = useScoreTracker();

  const [flashX, setFlashX] = useState(false);
  const [flashO, setFlashO] = useState(false);
  const [flashTies, setFlashTies] = useState(false);

  useCpuLogic({
    board,
    currentPlayer,
    setBoard,
    setCurrentPlayer,
    gameMode,
    isGameOver,
    playerChoice,
  });

  const handleNextRound = () => {
    resetBoard();
    closeDialog();
  };

  const handleOpenDialog = () => {
    if (isGameOver) return;
    openDialog('Restart Game?', 'Yes, Restart', 'No, Cancel', null, true);
  };

  useEffect(() => {
    if (winner !== null || isGameOver) {
      if (winner) {
        updateScore(winner);
        if (winner === 'X') setFlashX(true);
        if (winner === 'O') setFlashO(true);

        setTimeout(() => {
          openDialog(`Player ${winner === playerChoice ? '1' : '2'} Wins!`, 'Next Round', 'Quit', winner);
          setFlashX(false);
          setFlashO(false);
        }, 1500);
      } else {
        updateScore(null);
        setFlashTies(true);
        openDialog('Round Tied', 'Next Round', 'Quit', null);
        setFlashTies(false);
      }
    }
  }, [winner, isGameOver, gameMode, playerChoice, openDialog, updateScore]);

  const getFooterText = () => {
    if (gameMode === 'cpu') {
      return playerChoice === 'X' ? { xText: 'X (YOU)', oText: 'O (CPU)' } : { xText: 'X (CPU)', oText: 'O (YOU)' };
    } else {
      return playerChoice === 'X' ? { xText: 'X (P1)', oText: 'O (P2)' } : { xText: 'X (P2)', oText: 'O (P1)' };
    }
  };

  const { xText, oText } = getFooterText();

  return (
    <div className={`game ${isGameOver ? 'disabled' : ''}`} ref={ref}>
      {isGameOver && <div className='interaction-overlay' />}
      <header className='game-header'>
        <div className='player-indicator'>
          <img src={iconX} alt='X' className='icon' />
          <img src={iconO} alt='O' className='icon' />
        </div>
        <div className='turn-indicator'>
          {currentPlayer === 'X' ? (
            <svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' className='turn-indicator-icon'>
              <path transform='scale(0.25)' d='M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z' fillRule='evenodd' />
            </svg>
          ) : (
            <svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' className='turn-indicator-icon'>
              <path transform='scale(0.25)' d='M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z' />
            </svg>
          )}
          <span>TURN</span>
        </div>
        <div className='button-container'>
          <ThemedButton onClick={handleOpenDialog} variant='tertiary' disabled={isGameOver}>
            <img src={iconRestart} alt='Restart' className='icon' />
          </ThemedButton>
        </div>
      </header>
      <main className={`board ${isGameOver ? 'game-over' : ''}`}>
        {board.map((value, index) => (
          <button key={index} type='button' className={`square ${value ? 'occupied' : `${currentPlayer.toLowerCase()}-hover ${gameMode === 'cpu' && currentPlayer !== playerChoice ? 'disable-hover' : ''}`} ${value && winningSquares.includes(index) ? `winner winner-${value.toLowerCase()}` : ''}`} onClick={() => handleSquareClick(index)} title={`Square ${index + 1}`} disabled={!!winner || (gameMode === 'cpu' && currentPlayer !== playerChoice)}>
            {value && <img src={winningSquares.includes(index) ? (value === 'X' ? iconXDark : iconODark) : value === 'X' ? iconX : iconO} alt={value} className='icon' />}
          </button>
        ))}
      </main>
      <footer className='game-footer'>
        <div className={`score x-score ${flashX ? 'flash' : ''}`}>
          <span>{xText}</span>
          <span>{scores.X}</span>
        </div>
        <div className={`score ties-score ${flashTies ? 'flash' : ''}`}>
          <span>TIES</span>
          <span>{scores.ties}</span>
        </div>
        <div className={`score o-score ${flashO ? 'flash' : ''}`}>
          <span>{oText}</span>
          <span>{scores.O}</span>
        </div>
      </footer>
      <Dialog message={dialogMessage} confirmText={confirmText} cancelText={cancelText} onConfirm={isRestartDialog ? restartGame : handleNextRound} onCancel={isRestartDialog ? closeDialog : restartGame} isOpen={isDialogOpen} closeOnBackgroundClick={!isGameOver} dialogWinner={dialogWinner} playerChoice={playerChoice} gameMode={gameMode} />
    </div>
  );
});

export default Game;
