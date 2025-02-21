import React, { forwardRef } from 'react';

interface PaddleProps {
  y: number;
  side: 'left' | 'right';
}

// Use forwardRef to pass the ref to the div element
const Paddle = forwardRef<HTMLDivElement, PaddleProps>(({ y, side }, ref) => {
  const paddleStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${y}px`,
    width: '10px',
    height: '100px',
    backgroundColor: side === 'left' ? 'blue' : 'red',
    left: side === 'left' ? '0' : '790px',
  };

  return <div ref={ref} style={paddleStyle}></div>;
});

export default Paddle;
