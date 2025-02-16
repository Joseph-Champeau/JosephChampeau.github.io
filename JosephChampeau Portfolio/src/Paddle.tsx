import React from 'react';

interface PaddleProps {
  y: number;
  side: 'left' | 'right';
}

const Paddle: React.FC<PaddleProps> = ({ y, side }) => {
  const paddleStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${y}px`,
    width: '10px',
    height: '100px',
    backgroundColor: side === 'left' ? 'blue' : 'red',
    left: side === 'left' ? '0' : '790px',
  };

  return <div style={paddleStyle}></div>;
};

export default Paddle;
