import { useState, useEffect, useCallback } from 'react';
import { checkWinner } from '../utils/gameUtils';
import useLocalStorage from './useLocalStorage';

interface GameLogicParams {
  playerChoice: 'X' | 'O';
}

export const useGameLogic = ({ playerChoice }: GameLogicParams) => {
  const [initialPlayer, setInitialPlayer] = useLocalStorage<'X' | 'O'>('initialPlayer', 'X');
  const [currentPlayer, setCurrentPlayer] = useLocalStorage<'X' | 'O'>('currentPlayer', initialPlayer);
  const [board, setBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningSquares([]);
    setIsGameOver(false);
  }, []);

  useEffect(() => {
    resetBoard();
  }, [playerChoice, resetBoard]);

  const handleSquareClick = (index: number) => {
    if (board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const { winner, winningSquares } = checkWinner(newBoard);

    if (winner) {
      setWinner(winner);
      setWinningSquares(winningSquares);
      setIsGameOver(true);
      setInitialPlayer(initialPlayer === 'X' ? 'O' : 'X');
    } else if (!newBoard.includes(null)) {
      setIsGameOver(true);
      setInitialPlayer(initialPlayer === 'X' ? 'O' : 'X');
    }
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  useEffect(() => {
    setCurrentPlayer(initialPlayer);
  }, [initialPlayer, setCurrentPlayer]);

  return {
    currentPlayer,
    setCurrentPlayer,
    board,
    setBoard,
    winner,
    setWinner,
    winningSquares,
    setWinningSquares,
    isGameOver,
    setIsGameOver,
    handleSquareClick,
    resetBoard,
    setInitialPlayer,
    initialPlayer,
  };
};
