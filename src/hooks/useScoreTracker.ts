import { useState, useCallback } from 'react';

interface Scores {
  X: number;
  O: number;
  ties: number;
}

export const useScoreTracker = () => {
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, ties: 0 });

  const updateScore = useCallback((winner: 'X' | 'O' | null) => {
    setScores((prevScores) => {
      const newScores = { ...prevScores };
      if (winner) {
        newScores[winner]++;
      } else {
        newScores.ties++;
      }
      return newScores;
    });
  }, []);

  return {
    scores,
    updateScore,
  };
};
