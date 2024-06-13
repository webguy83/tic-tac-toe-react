import React from 'react';

interface SquareProps {
  value: number;
}

const Square: React.FC<SquareProps> = ({ value }) => {
  return (
    <button type='button' className='square' aria-label={`Square ${value}`}>
      {value}
    </button>
  );
};

export default Square;
