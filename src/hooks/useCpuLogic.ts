import { useEffect, useCallback } from 'react';
import { checkWinner } from '../utils/gameUtils';

interface CpuLogicParams {
  board: Array<'X' | 'O' | null>;
  currentPlayer: 'X' | 'O';
  setBoard: React.Dispatch<React.SetStateAction<Array<'X' | 'O' | null>>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<'X' | 'O'>>;
  gameMode: 'cpu' | 'player';
  isGameOver: boolean;
  playerChoice: 'X' | 'O';
}

const minimax = (board: Array<'X' | 'O' | null>, depth: number, isMaximizing: boolean, player: 'X' | 'O', opponent: 'X' | 'O'): number => {
  const { winner } = checkWinner(board);
  if (winner === player) return 10 - depth;
  if (winner === opponent) return depth - 10;
  if (!board.includes(null)) return 0;

  const moves = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = isMaximizing ? player : opponent;
      const score = minimax(board, depth + 1, !isMaximizing, player, opponent);
      moves.push(score);
      board[i] = null;
    }
  }

  return isMaximizing ? Math.max(...moves) : Math.min(...moves);
};

const findBestMove = (board: Array<'X' | 'O' | null>, player: 'X' | 'O', opponent: 'X' | 'O'): number => {
  let bestMove = -1;
  let bestValue = -Infinity;

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = player;
      const moveValue = minimax(board, 0, false, player, opponent);
      board[i] = null;
      if (moveValue > bestValue) {
        bestMove = i;
        bestValue = moveValue;
      }
    }
  }

  return bestMove;
};

export const useCpuLogic = ({ board, currentPlayer, setBoard, setCurrentPlayer, gameMode, isGameOver, playerChoice }: CpuLogicParams) => {
  const opponent = playerChoice === 'X' ? 'O' : 'X';

  const cpuMove = useCallback(() => {
    if (gameMode === 'cpu' && currentPlayer === opponent && !isGameOver) {
      const bestMove = findBestMove([...board], opponent, playerChoice);
      setTimeout(() => {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[bestMove] = opponent;
          return newBoard;
        });
        setCurrentPlayer(playerChoice);
      }, 1000);
    }
  }, [board, currentPlayer, opponent, playerChoice, gameMode, isGameOver, setBoard, setCurrentPlayer]);

  useEffect(() => {
    cpuMove();
  }, [cpuMove]);
};