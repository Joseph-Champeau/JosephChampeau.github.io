import React from 'react';

interface BallProps {
  x: number;
  y: number;
  size: number;
}

const Ball: React.FC<BallProps> = ({ x, y, size }) => {
  const ballStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${y}px`,
    left: `${x}px`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: 'white',
    borderRadius: '50%',
  };

  return <div style={ballStyle}></div>;
};

export default Ball;
