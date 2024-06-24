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
import { oPath, xPath } from '../utils/gameUtils';

interface GameProps {
  restartGame: () => void;
  playerChoice: 'X' | 'O';
  gameMode: 'cpu' | 'player';
  initialPlayer: 'X' | 'O';
}

const Game = forwardRef<HTMLDivElement, GameProps>(({ restartGame, playerChoice, gameMode, initialPlayer }, ref) => {
  const { currentPlayer, setCurrentPlayer, board, setBoard, winner, winningSquares, isGameOver, handleSquareClick, resetBoard, setWinner, setWinningSquares, setIsGameOver, setInitialPlayer } = useGameLogic({ playerChoice, initialPlayer });

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
    setWinner,
    setWinningSquares,
    setIsGameOver,
    initialPlayer,
    setInitialPlayer,
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
        }, 1000);
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

  function getTurnIndicatorIcon(currentPlayer: 'X' | 'O', winner: 'X' | 'O' | null, xPath: string, oPath: string, isGameOver: boolean) {
    const player = currentPlayer === 'X' || winner === 'X' ? 'X' : 'O';
    const path = player === 'X' ? xPath : oPath;
    return (
      <svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' className='turn-indicator-icon'>
        <path transform='scale(0.25)' d={path} fillRule='evenodd' />
      </svg>
    );
  }

  return (
    <div className={`game ${isGameOver ? 'disabled' : ''}`} ref={ref}>
      {isGameOver && <div className='interaction-overlay' />}
      <header className='game-header'>
        <div className='player-indicator'>
          <img src={iconX} alt='X' className='icon' />
          <img src={iconO} alt='O' className='icon' />
        </div>
        <div className='turn-indicator'>
          {getTurnIndicatorIcon(currentPlayer, winner, xPath, oPath, isGameOver)}
          <span>TURN</span>
        </div>
        <div className='button-container' tabIndex={0}>
          <ThemedButton onClick={handleOpenDialog} variant='tertiary' disabled={isGameOver}>
            <img src={iconRestart} alt='Restart' className='icon' />
          </ThemedButton>
        </div>
      </header>
      <div className={`board ${isGameOver ? 'game-over' : ''}`}>
        {board.map((value, index) => (
          <button key={index} type='button' className={`square ${value ? 'occupied' : `${currentPlayer.toLowerCase()}-hover ${gameMode === 'cpu' && currentPlayer !== playerChoice ? 'disable-hover' : ''}`} ${value && winningSquares.includes(index) ? `winner winner-${value.toLowerCase()}` : ''}`} onClick={() => handleSquareClick(index)} title={`Square ${index + 1}`} disabled={!!winner || (gameMode === 'cpu' && currentPlayer !== playerChoice)}>
            {value && <img src={winningSquares.includes(index) ? (value === 'X' ? iconXDark : iconODark) : value === 'X' ? iconX : iconO} alt={value} className='icon fade-in' />}
          </button>
        ))}
      </div>
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
