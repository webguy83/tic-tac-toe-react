import { useState, useCallback, useEffect } from 'react';
import { checkWinner, findBestMove } from '../utils/gameUtils';
import useLocalStorage from './useLocalStorage';

export const useGameLogic = () => {
  const [initialPlayer, setInitialPlayer] = useLocalStorage<'X' | 'O'>('initialPlayer', 'X');
  const [currentPlayer, setCurrentPlayer] = useLocalStorage<'X' | 'O'>('currentPlayer', initialPlayer);
  const [board, setBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameMode] = useLocalStorage<'cpu' | 'player'>('gameMode', 'player');
  const [playerChoice] = useLocalStorage<'X' | 'O'>('playerChoice', 'X');

  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningSquares([]);
    setIsGameOver(false);
  }, []);

  const handleSquareClick = useCallback(
    (index: number) => {
      if (board[index] || isGameOver) return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const { winner, winningSquares } = checkWinner(newBoard);

      if (winner) {
        setWinner(winner);
        setWinningSquares(winningSquares);
        setIsGameOver(true);
        setInitialPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
      } else if (!newBoard.includes(null)) {
        setIsGameOver(true);
        setInitialPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    },
    [board, currentPlayer, isGameOver, setCurrentPlayer, setInitialPlayer]
  );

  useEffect(() => {
    const cpuPlayer = playerChoice === 'X' ? 'O' : 'X';

    // If in CPU mode and it's CPU's turn
    if (gameMode === 'cpu' && currentPlayer === cpuPlayer && !isGameOver && !winner) {
      const bestMove = findBestMove([...board], cpuPlayer, playerChoice);
      if (bestMove !== -1) {
        setTimeout(() => handleSquareClick(bestMove), 500);
      }
    }
  }, [board, currentPlayer, gameMode, winner, isGameOver, initialPlayer, handleSquareClick, playerChoice]);

  return {
    currentPlayer,
    setCurrentPlayer,
    board,
    winner,
    winningSquares,
    isGameOver,
    handleSquareClick,
    resetBoard,
    initialPlayer,
  };
};
