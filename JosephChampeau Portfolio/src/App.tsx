import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Paddle from './src/Paddle';
import Ball from './src/Ball';

const canvasWidth = 800;
const canvasHeight = 600;
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

const App: React.FC = () => {
  const [leftPaddleY, setLeftPaddleY] = useState<number>(canvasHeight / 2 - paddleHeight / 2);
  const [rightPaddleY, setRightPaddleY] = useState<number>(canvasHeight / 2 - paddleHeight / 2);
  const [ballPos, setBallPos] = useState<{ x: number; y: number }>({ x: canvasWidth / 2, y: canvasHeight / 2 });
  const [ballSpeed, setBallSpeed] = useState<{ dx: number; dy: number }>({ dx: 4, dy: 4 });
  const [leftScore, setLeftScore] = useState<number>(0);
  const [rightScore, setRightScore] = useState<number>(0);
  const leftPaddleRef = useRef<HTMLDivElement | null>(null);
  const rightPaddleRef = useRef<HTMLDivElement | null>(null);
  const ballRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    const speed = 30; // Paddle speed
    if (event.key === 'ArrowUp' && rightPaddleY > 0) {
      setRightPaddleY(prevY => Math.max(0, prevY - speed));
    } else if (event.key === 'ArrowDown' && rightPaddleY < canvasHeight - paddleHeight) {
      setRightPaddleY(prevY => Math.min(canvasHeight - paddleHeight, prevY + speed));
    }

    if (event.key === 'w' && leftPaddleY > 0) {
      setLeftPaddleY(prevY => Math.max(0, prevY - speed));
    } else if (event.key === 's' && leftPaddleY < canvasHeight - paddleHeight) {
      setLeftPaddleY(prevY => Math.min(canvasHeight - paddleHeight, prevY + speed));
    }
  };

  const updateBallPosition = () => {
    setBallPos(prev => ({
      x: prev.x + ballSpeed.dx,
      y: prev.y + ballSpeed.dy,
    }));
  };

  const checkCollisions = () => {
    // Left paddle collision
    if (
      ballPos.x <= paddleWidth &&
      ballPos.y >= leftPaddleY &&
      ballPos.y <= leftPaddleY + paddleHeight
    ) {
      setBallSpeed(prev => ({
        dx: -prev.dx,
        dy: prev.dy,
      }));
    }

    // Right paddle collision
    if (
      ballPos.x >= canvasWidth - paddleWidth - ballSize &&
      ballPos.y >= rightPaddleY &&
      ballPos.y <= rightPaddleY + paddleHeight
    ) {
      setBallSpeed(prev => ({
        dx: -prev.dx,
        dy: prev.dy,
      }));
    }

    // Top/bottom wall collision
    if (ballPos.y <= 0 || ballPos.y >= canvasHeight - ballSize) {
      setBallSpeed(prev => ({
        dx: prev.dx,
        dy: -prev.dy,
      }));
    }

    // Score update
    if (ballPos.x <= 0) {
      setRightScore(prev => prev + 1);
      setBallPos({ x: canvasWidth / 2, y: canvasHeight / 2 });
      setBallSpeed({ dx: -ballSpeed.dx, dy: ballSpeed.dy });
    } else if (ballPos.x >= canvasWidth) {
      setLeftScore(prev => prev + 1);
      setBallPos({ x: canvasWidth / 2, y: canvasHeight / 2 });
      setBallSpeed({ dx: -ballSpeed.dx, dy: ballSpeed.dy });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(() => {
      updateBallPosition();
      checkCollisions();
    }, 1000 / 60);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [ballPos, ballSpeed, leftPaddleY, rightPaddleY]);

  return (
    <div className="game-container">
      <div className="score">
        <span>{leftScore}</span> - <span>{rightScore}</span>
      </div>
      <div className="game-canvas" style={{ position: 'relative', width: canvasWidth, height: canvasHeight }}>
        <Paddle ref={leftPaddleRef} y={leftPaddleY} side="left" />
        <Paddle ref={rightPaddleRef} y={rightPaddleY} side="right" />
        <Ball x={ballPos.x} y={ballPos.y} size={ballSize} />
      </div>
    </div>
  );
};

export default App;
