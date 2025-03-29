import React, { useState } from 'react';
import './../TicTacToe/TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    // Use state to manage the board data
    const [data, setData] = useState(["","","","","","","","",""]);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState(null);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        
        // Create a new copy of the data array
        const newData = [...data];
        
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}'>`;
            newData[num] = "x";
        } else {
            e.target.innerHTML = `<img src='${circle_icon}'>`;
            newData[num] = "o";
        }
        
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    }

    const checkWin = (currentData) => {
        // Winning combinations
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (currentData[a] !== "" && 
                currentData[a] === currentData[b] && 
                currentData[b] === currentData[c]) {
                won(currentData[a]);
                return;
            }
        }
        
        // Check for draw
        if (!currentData.includes("") && !winner) {
            setWinner("draw");
            setLock(true);
        }
    }

    const won = (player) => {
        setWinner(player);
        setLock(true);
    }

    const resetGame = () => {
        setData(["","","","","","","","",""]);
        setCount(0);
        setLock(false);
        setWinner(null);
        
        // Clear all boxes
        const boxes = document.querySelectorAll('.boxes');
        boxes.forEach(box => {
            box.innerHTML = "";
        });
    }

    return (
        <div className='container'>
            <h1 className='title'>
                Tic Tac Toe Game in <span>React</span>
            </h1>
            
            {winner && (
                <h2 className='winner-text'>
                    {winner === "draw" 
                        ? "It's a draw!" 
                        : `Player ${winner.toUpperCase()} wins!`}
                </h2>
            )}
            
            <div className='board'>
                <div className='row1'>
                    <div className='boxes' onClick={(e) => {toggle(e, 0)}}></div>
                    <div className='boxes' onClick={(e) => {toggle(e, 1)}}></div>
                    <div className='boxes' onClick={(e) => {toggle(e, 2)}}></div>
                </div>
                <div className='row2'>
                    <div className='boxes' onClick={(e) => {toggle(e, 3)}}></div>
                    <div className='boxes' onClick={(e) => {toggle(e, 4)}}></div>
                    <div className='boxes' onClick={(e) => {toggle(e, 5)}}></div>
                </div>
                <div className='row3'>
                    <div className='boxes' onClick={(e) => {toggle(e, 6)}}></div>
                    <div className='boxes' onClick={(e) => {toggle(e, 7)}}></div>
                    <div className='boxes' onClick={(e) => {toggle(e, 8)}}></div>
                </div>
            </div>
            
            <button className='reset' onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;