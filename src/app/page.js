"use client";
import { useState } from "react";

function Square({ value, onClick} ) {
  return (
  <button className="square" onClick={onClick}>
    {value}
    </button>
    );
}

function Board({ squares, xIsNext, onPlay}) { 


  function onSquareClick(idx) {
    if (squares[idx] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[idx] = xIsNext ? "X" : "O";
    onPlay(newSquares);
  }

  const winner = calculateWinner(squares);
  return (
   <>
    {winner ? (
      <p>Winner is: {winner}</p>
    ) : (
      <p>Next Player: {xIsNext ? "X" : "O"}</p>
    )}
    <div className="board-row">
      <Square value={squares[0]} onClick={() => onSquareClick(0)} />
      <Square value={squares[1]} onClick={() => onSquareClick(1)} />
      <Square value={squares[2]} onClick={() => onSquareClick(2)} />
      <Square value={squares[3]} onClick={() => onSquareClick(3)} />
    </div>
    <div className="board-row">
      <Square value={squares[4]} onClick={() => onSquareClick(4)} />
      <Square value={squares[5]} onClick={() => onSquareClick(5)} />
      <Square value={squares[6]} onClick={() => onSquareClick(6)} />
      <Square value={squares[7]} onClick={() => onSquareClick(7)} />
    </div>
    <div className="board-row">
      <Square value={squares[8]} onClick={() => onSquareClick(8)} />
      <Square value={squares[9]} onClick={() => onSquareClick(9)} />
      <Square value={squares[10]} onClick={() => onSquareClick(10)} />
      <Square value={squares[11]} onClick={() => onSquareClick(11)} />
    </div>
    <div className="board-row">
      <Square value={squares[12]} onClick={() => onSquareClick(12)} />
      <Square value={squares[13]} onClick={() => onSquareClick(13)} />
      <Square value={squares[14]} onClick={() => onSquareClick(14)} />
      <Square value={squares[15]} onClick={() => onSquareClick(15)} />
    </div>
   </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c] === squares[d]) { 
      return squares[a];
    }
  }

  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 == 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to a move # " + move;
    } else {
      description = "Go to game start";
    }
    return <li key={move + Math.random()}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  })

  return (
    <div className="game">
      <div className="game=board">
        <Board squares={currentSquares} xIsNext={ xIsNext} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
    </div>
  )
  }

  
