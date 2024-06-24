import React, { useRef } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles/global.scss';
import './styles/transitions.scss';
import useLocalStorage from './hooks/useLocalStorage';
import { Scores } from './utils/types';

const App: React.FC = () => {
  const [gameStarted, setGameStarted, removeGameStartedFromStorage] = useLocalStorage('gameStarted', false);
  const [gameMode, setGameMode, removeGameModeFromStorage] = useLocalStorage<'cpu' | 'player'>('gameMode', 'player');
  const [playerChoice, setPlayerChoice, removePlayerChoiceFromStorage] = useLocalStorage<'X' | 'O'>('playerChoice', 'X');
  const [, , removeScoresFromStorage] = useLocalStorage<Scores>('scores', { X: 0, O: 0, ties: 0 });
  const [, , removeCurrentPlayerFromStorage] = useLocalStorage<'X' | 'O'>('currentPlayer', 'X');
  const [initialPlayer, setInitialPlayer, removeInitialPlayer] = useLocalStorage<'X' | 'O'>('initialPlayer', 'X');

  const gameNodeRef = useRef(null);
  const mainMenuNodeRef = useRef(null);

  const startGame = (mode: 'cpu' | 'player', choice: 'X' | 'O') => {
    setGameMode(mode);
    setPlayerChoice(choice);
    setGameStarted(true);
    setInitialPlayer('X');
  };

  const restartGame = () => {
    setGameStarted(false);
    removeInitialPlayer();
    removeGameStartedFromStorage();
    removeGameModeFromStorage();
    removePlayerChoiceFromStorage();
    removeCurrentPlayerFromStorage();
    removeScoresFromStorage();
  };

  return (
    <div className='App'>
      <header>
        <h1 className='sr-only'>Tic Tac Toe Game</h1>
      </header>
      <main className='app-main'>
        <TransitionGroup component={null}>
          {gameStarted ? (
            <CSSTransition key='game' timeout={300} classNames='fade' nodeRef={gameNodeRef}>
              {/* Use React Fragment to avoid adding extra div */}
              <>
                <Game restartGame={restartGame} playerChoice={playerChoice} gameMode={gameMode} ref={gameNodeRef} initialPlayer={initialPlayer} />
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
      </main>
    </div>
  );
};

export default App;
