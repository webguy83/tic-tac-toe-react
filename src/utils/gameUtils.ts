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
