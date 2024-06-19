import { useState, useEffect, useCallback } from 'react';
import { checkWinner } from '../utils/gameUtils';

interface GameLogicParams {
  playerChoice: 'X' | 'O';
  initialPlayer: 'X' | 'O';
}

export const useGameLogic = ({ playerChoice, initialPlayer }: GameLogicParams) => {
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(initialPlayer);
  const [board, setBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const resetBoard = useCallback(
    (startingPlayer: 'X' | 'O' = initialPlayer) => {
      setBoard(Array(9).fill(null));
      setCurrentPlayer(startingPlayer);
      setWinner(null);
      setWinningSquares([]);
      setIsGameOver(false);
    },
    [initialPlayer]
  );

  useEffect(() => {
    resetBoard(initialPlayer);
  }, [playerChoice, initialPlayer, resetBoard]);

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
    } else if (!newBoard.includes(null)) {
      setIsGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

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
  };
};
