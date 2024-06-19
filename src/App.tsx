import React, { useState, useRef } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles/global.scss';
import './styles/transitions.scss';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<'cpu' | 'player'>('player');
  const [playerChoice, setPlayerChoice] = useState<'X' | 'O'>('X');

  const gameNodeRef = useRef(null);
  const mainMenuNodeRef = useRef(null);

  const startGame = (mode: 'cpu' | 'player', choice: 'X' | 'O') => {
    setGameMode(mode);
    setPlayerChoice(choice);
    setGameStarted(true);
  };

  const restartGame = () => {
    setGameStarted(false);
  };

  return (
    <div className='App'>
      <TransitionGroup component={null}>
        {gameStarted ? (
          <CSSTransition key='game' timeout={300} classNames='fade' nodeRef={gameNodeRef}>
            {/* Use React Fragment to avoid adding extra div */}
            <>
              <Game restartGame={restartGame} playerChoice={playerChoice} gameMode={gameMode} ref={gameNodeRef} />
            </>
          </CSSTransition>
        ) : (
          <CSSTransition key='mainMenu' timeout={300} classNames='fade' nodeRef={mainMenuNodeRef}>
            <>
              <MainMenu startGame={startGame} ref={mainMenuNodeRef} />
            </>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default App;
