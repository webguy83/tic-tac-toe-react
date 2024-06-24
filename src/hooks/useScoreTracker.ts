import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

interface Scores {
  X: number;
  O: number;
  ties: number;
}

export const useScoreTracker = () => {
  const [scores, setScores] = useLocalStorage<Scores>('scores', { X: 0, O: 0, ties: 0 });

  const updateScore = useCallback(
    (winner: 'X' | 'O' | null) => {
      setScores((prevScores) => {
        const newScores = { ...prevScores };
        if (winner) {
          newScores[winner]++;
        } else {
          newScores.ties++;
        }
        return newScores;
      });
    },
    [setScores]
  );

  return {
    scores,
    updateScore,
  };
};
