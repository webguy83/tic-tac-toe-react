import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import './styles/global.scss';
import './styles/transitions.scss';

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

  return (
    <div className='App'>
      <TransitionGroup component={null}>
        {gameStarted ? (
          <CSSTransition key='game' timeout={300} classNames='fade'>
            <Game restartGame={restartGame} />
          </CSSTransition>
        ) : (
          <CSSTransition key='mainMenu' timeout={300} classNames='fade'>
            <MainMenu startGame={startGame} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default App;
