import { useState, useEffect, useCallback, useMemo } from 'react';

interface GameLogicParams {
  playerChoice: 'X' | 'O';
}

export const useGameLogic = ({ playerChoice }: GameLogicParams) => {
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [board, setBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const winConditions = useMemo(() => [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]  // diagonals
  ], []);

  useEffect(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X'); // X always starts
    setWinner(null);
    setWinningSquares([]);
    setIsGameOver(false);
  }, [playerChoice]);

  const checkWinner = useCallback(() => {
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningSquares(condition);
        setIsGameOver(true);
        return { winner: board[a], winningSquares: condition };
      }
    }
    if (!board.includes(null) && !winner) {
      setIsGameOver(true);
    }
    return null;
  }, [board, winConditions, winner]);

  useEffect(() => {
    checkWinner();
  }, [board, checkWinner]);

  const handleSquareClick = (index: number) => {
    if (board[index] || winner) return; // Ignore if square is occupied or game has a winner

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  return {
    currentPlayer,
    board,
    winner,
    winningSquares,
    isGameOver,
    handleSquareClick,
  };
};
