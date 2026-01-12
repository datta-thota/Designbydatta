import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NokiaSnakeModal.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[10, 10], [10, 11], [10, 12]];
const INITIAL_DIRECTION = 'UP';
const SPEED = 200;

const NokiaSnakeModal = ({ isOpen, onClose }) => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState([5, 5]);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [level, setLevel] = useState(1);

    const gameLoopRef = useRef();

    const generateFood = useCallback((currentSnake) => {
        let newFood;
        while (true) {
            newFood = [
                Math.floor(Math.random() * GRID_SIZE),
                Math.floor(Math.random() * GRID_SIZE)
            ];
            const isOnSnake = currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]);
            if (!isOnSnake) break;
        }
        return newFood;
    }, []);

    const moveSnake = useCallback(() => {
        if (isGameOver || isPaused) return;

        setSnake((prevSnake) => {
            const head = [...prevSnake[0]];
            switch (direction) {
                case 'UP': head[1] -= 1; break;
                case 'DOWN': head[1] += 1; break;
                case 'LEFT': head[0] -= 1; break;
                case 'RIGHT': head[0] += 1; break;
                default: break;
            }

            // Collision Detection (Walls)
            if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE) {
                setIsGameOver(true);
                return prevSnake;
            }

            // Collision Detection (Self)
            if (prevSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
                setIsGameOver(true);
                return prevSnake;
            }

            const newSnake = [head, ...prevSnake];

            // Food Check
            if (head[0] === food[0] && head[1] === food[1]) {
                const newScore = score + 10;
                setScore(newScore);
                setFood(generateFood(newSnake));
                if (newScore > 0 && newScore % 50 === 0) setLevel(l => l + 1);
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, isGameOver, isPaused, score, generateFood]);

    useEffect(() => {
        if (isOpen && !isGameOver && !isPaused) {
            gameLoopRef.current = setInterval(moveSnake, Math.max(50, SPEED - (level * 10)));
        } else {
            clearInterval(gameLoopRef.current);
        }
        return () => clearInterval(gameLoopRef.current);
    }, [isOpen, isGameOver, isPaused, moveSnake, level]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
                case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
                case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
                case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
                case ' ': setIsPaused(p => !p); break;
                default: break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setScore(0);
        setLevel(1);
        setIsGameOver(false);
        setIsPaused(false);
        setFood(generateFood(INITIAL_SNAKE));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="nokia-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="nokia-chassis">
                    <div className="nokia-screen-container">
                        <div className="nokia-header">
                            <span className="nokia-pixel-text">SCORE: {score}</span>
                            <span className="nokia-pixel-text">LVL: {level}</span>
                            <button className="nokia-pause-btn" onClick={() => setIsPaused(!isPaused)}>
                                {isPaused ? '▶' : '||'}
                            </button>
                        </div>

                        <div className="nokia-lcd">
                            {Array.from({ length: GRID_SIZE }).map((_, y) => (
                                <div key={y} className="nokia-row">
                                    {Array.from({ length: GRID_SIZE }).map((_, x) => {
                                        const isSnake = snake.some(s => s[0] === x && s[1] === y);
                                        const isFood = food[0] === x && food[1] === y;
                                        return (
                                            <div
                                                key={x}
                                                className={`nokia-pixel ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                                            />
                                        );
                                    })}
                                </div>
                            ))}

                            {isGameOver && (
                                <div className="nokia-overlay-screen">
                                    <h2 className="nokia-pixel-text large">GAME OVER</h2>
                                    <button className="nokia-retro-btn" onClick={resetGame}>RETRY</button>
                                </div>
                            )}

                            {isPaused && !isGameOver && (
                                <div className="nokia-overlay-screen">
                                    <h2 className="nokia-pixel-text large">PAUSED</h2>
                                    <button className="nokia-retro-btn" onClick={() => setIsPaused(false)}>RESUME</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="nokia-controls">
                        <div className="nokia-dpad">
                            <button className="d-btn up" onClick={() => direction !== 'DOWN' && setDirection('UP')}>▲</button>
                            <div className="d-row">
                                <button className="d-btn left" onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}>◀</button>
                                <button className="d-btn center" onClick={onClose}>×</button>
                                <button className="d-btn right" onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}>▶</button>
                            </div>
                            <button className="d-btn down" onClick={() => direction !== 'UP' && setDirection('DOWN')}>▼</button>
                        </div>
                    </div>

                    <button className="nokia-exit-btn" onClick={onClose}>EXIT SYSTEM</button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NokiaSnakeModal;
