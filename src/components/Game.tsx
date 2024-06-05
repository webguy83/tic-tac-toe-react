import React from 'react';
import '../styles/game.scss';
import iconX from '../assets/icon-x.svg';
import iconRestart from '../assets/icon-restart.svg';

interface GameProps {
  restartGame: () => void;
}

const Game: React.FC<GameProps> = ({ restartGame }) => {
  return (
    <div className='game'>
      <div className='game-header'>
        <img src={iconX} alt='X' className='icon' />
        <span>TURN</span>
        <img src={iconRestart} alt='Restart' className='icon restart' onClick={restartGame} />
      </div>
      <div className='board'>{/* Render the board squares here */}</div>
      <div className='game-footer'>
        <div className='score x-score'>
          <span>X (P1)</span>
          <span>14</span>
        </div>
        <div className='score ties-score'>
          <span>TIES</span>
          <span>32</span>
        </div>
        <div className='score o-score'>
          <span>O (P2)</span>
          <span>11</span>
        </div>
      </div>
    </div>
  );
};

export default Game;
