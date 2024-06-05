import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import './styles/global.scss';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<'cpu' | 'player'>('player');

  const startGame = (mode: 'cpu' | 'player') => {
    setGameMode(mode);
    setGameStarted(true);
  };

  const restartGame = () => {
    setGameStarted(false);
  };

  return <div className='App'>{gameStarted ? <Game restartGame={restartGame} /> : <MainMenu startGame={startGame} />}</div>;
};

export default App;
