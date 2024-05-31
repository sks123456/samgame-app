// src/SnakeGame.js
import React, { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(10, 0, 0, 10, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = 'green';
    snake.forEach(cell => context.fillRect(cell.x, cell.y, 1, 1));
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, 1, 1);
  }, [snake, food, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake(prev => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
          default:
            break;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30) });
          setSpeed(prev => prev > 50 ? prev - 10 : prev);
        } else {
          newSnake.pop();
        }

        if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30 || newSnake.slice(1).some(cell => cell.x === head.x && cell.y === head.y)) {
          setGameOver(true);
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [direction, speed, gameOver, food]);

  return (
    <div>
      <canvas ref={canvasRef} width="300" height="300" className="game-board" />
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
};

export default SnakeGame;
