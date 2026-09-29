import { useState } from 'react';
import './App.css';


function Square({ value, squareClick }) {

  return (
    <>
      <button onClick={squareClick} className='border border-gray-400 h-12 w-12 m-1 leading-9 text-lg'>{value}</button>
    </>
  );
}


function Board({nextValue, squares, onPlay}) {

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next Player: " + (nextValue ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const newSquare = squares.slice();
    if (nextValue) {
      newSquare[i] = 'X';
    } else {
      newSquare[i] = 'O';
    }
    onPlay(newSquare);
  }

  return (
    <>
      <div>{status}</div>
      <div className='flex'>
        <Square value={squares[0]} squareClick={() => handleClick(0)} />
        <Square value={squares[1]} squareClick={() => handleClick(1)} />
        <Square value={squares[2]} squareClick={() => handleClick(2)} />
      </div>
      <div className='flex'>
        <Square value={squares[3]} squareClick={() => handleClick(3)} />
        <Square value={squares[4]} squareClick={() => handleClick(4)} />
        <Square value={squares[5]} squareClick={() => handleClick(5)} />
      </div>
      <div className='flex'>
        <Square value={squares[6]} squareClick={() => handleClick(6)} />
        <Square value={squares[7]} squareClick={() => handleClick(7)} />
        <Square value={squares[8]} squareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


function calculateWinner(squares) {

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}


export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [nextValue, setNextValue] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(newSquare) {
    setNextValue(!nextValue);
    const nextHistory = [...history.slice(0, currentMove + 1), newSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move){
    setCurrentMove(move);
    setNextValue(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;

    if(move > 0){
      description = `Go to the move #${move}`;
    } else {
      description = `Go to start the game`;
    }

    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='flex'>
      <div>
        <Board nextValue={nextValue} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}