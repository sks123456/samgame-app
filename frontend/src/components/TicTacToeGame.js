import React, { useState } from 'react';

function TicTacToeGame() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');

    const handleClick = index => {
        if (board[index] || checkWinner(board)) return;
        const newBoard = board.slice();
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    const checkWinner = board => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const winner = checkWinner(board);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${currentPlayer}`;
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board">
                {board.map((cell, index) => (
                    <div key={index} className="cell" onClick={() => handleClick(index)}>
                        {cell}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TicTacToeGame;
