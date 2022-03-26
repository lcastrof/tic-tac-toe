import { FC, useState } from 'react';
import objectHash from 'object-hash';

import Column from '../../components/Column';
import Square from '../../components/Square';

import './styles.css';
import Confetti from 'react-confetti';

type Players = 'X' | 'O';

type Board = string[][];

const Game: FC = () => { 
  const [board, setBoard] = useState<Board>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [turn, setTurn] = useState<Players>('X');
  const [winner, setWinner] = useState<Players | null>(null);
  const [draw, setDraw] = useState(false);

  const resetBoard = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setTurn('X');
    setWinner(null);
    setDraw(false);
  }

  const checkWin = () =>  {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
          return board[i][0];
      }
    }
    for (let i = 0; i < board.length; i++) {
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
          return board[0][i];
      }
    }
    
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }

    return false;
  }

  const checkDraw = () => {
    return board.every(row => row.every(col => col !== ''));
  }

  const handlePlay = (row: number, col: number) => {
    const updatedBoard = [...board];

    if (updatedBoard[row][col] !== '' || winner) return;

    updatedBoard[row][col] = turn;
    setBoard(updatedBoard);
  
    if (checkWin()) {
      setWinner(turn);
      return;
    }

    if (checkDraw()) {
      setDraw(true);
      return;
    }

    setTurn(turn === 'X' ? 'O' : 'X');
  }

  return (
    <div className="game-wrapper">
      <h1 className="game-title">Tic-Tac-Toe</h1>
      {winner ? (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
          <p className="win-message">Player <strong>{winner}</strong> won!</p>
        </>
      ) : draw ? (
          <p className="draw-message">Draw!</p>
      ) : (
        <p className="game-turn">Player <strong>{turn}</strong> turn</p>
      )}
      <div className="ticTacToe">
        {board.map((row, rowIndex) => {
          const rowHash = objectHash(rowIndex);
          return (
            <Column key={rowHash}>
              {row.map((col, colIndex) => (
                <Square
                  thereIsAWinner={!!winner}
                  key={colIndex}
                  onClick={handlePlay}
                  row={rowIndex}
                  col={colIndex}
                  value={col}
                />
              ))}
            </Column>
          )})}
      </div>
      {(winner || draw) && (
        <button className="reset-button" onClick={resetBoard}>Play again</button>
      )}
    </div>
  );
};

export default Game;
