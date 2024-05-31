import React, { useState, useEffect } from 'react';
import './App.css';
import SnakeGame from './components/SnakeGame';
import TicTacToeGame from './components/TicTacToeGame';

function App() {
    const [game, setGame] = useState(null);
    const [serverStatus, setServerStatus] = useState('Loading...');

    useEffect(() => {
        fetch('/api/status')
            .then(response => response.json())
            .then(data => setServerStatus(data.status))
            .catch(error => setServerStatus('Error fetching server status'));
    }, []);

    return (
        <div className="container">
            <h1>Choose a Game</h1>
            <div className="menu">
                <button onClick={() => setGame('snake')}>Snake</button>
                <button onClick={() => setGame('tic-tac-toe')}>Tic-Tac-Toe</button>
            </div>
            <div id="game-container">
                {game === 'snake' && <SnakeGame />}
                {game === 'tic-tac-toe' && <TicTacToeGame />}
            </div>
            <footer>
                <p>Server Status: {serverStatus}</p>
            </footer>
        </div>
    );
}

export default App;
