export const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (board: Array<'X' | 'O' | null>): { winner: 'X' | 'O' | null; winningSquares: number[] } => {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningSquares: condition };
    }
  }
  return { winner: null, winningSquares: [] };
};

export const minimax = (board: Array<'X' | 'O' | null>, depth: number, isMaximizing: boolean, player: 'X' | 'O', opponent: 'X' | 'O'): number => {
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

export const findBestMove = (board: Array<'X' | 'O' | null>, player: 'X' | 'O', opponent: 'X' | 'O'): number => {
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


export const xPath = 'M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z';
export const oPath = 'M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z';
