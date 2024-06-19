import { useState, useEffect, useCallback } from 'react';
import { checkWinner } from '../utils/gameUtils';

interface GameLogicParams {
  playerChoice: 'X' | 'O';
}

export const useGameLogic = ({ playerChoice }: GameLogicParams) => {
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [board, setBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningSquares([]);
    setIsGameOver(false);
  }, []);

  useEffect(() => {
    resetBoard();
  }, [playerChoice, resetBoard]);

  const handleSquareClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  useEffect(() => {
    const { winner, winningSquares } = checkWinner(board);
    if (winner || !board.includes(null)) {
      setWinner(winner);
      setWinningSquares(winningSquares);
      setIsGameOver(true);
    }
  }, [board]);

  return {
    currentPlayer,
    setCurrentPlayer,
    board,
    setBoard,
    winner,
    winningSquares,
    isGameOver,
    handleSquareClick,
    resetBoard,
  };
};
