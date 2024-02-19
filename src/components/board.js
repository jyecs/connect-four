import { useState } from 'react';
import Cell from './cell'

export default function Board(props) {

const initialState = 
    [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],]
const board = [];
const [boardState, setBoardState] = useState(initialState);
const [player, setPlayer] = useState(1);
const [winner, setWinner] = useState(0);

function areEqual(arguements) {
  let len = arguements.length;
  for (let i = 1; i < len; i++) {
    if (arguements[i] === 0 || arguements[i] !== arguements[i-1]) {
      return false;
    }
  }
  return true;
}

function checkGameWon(board) {
  // check horizontal wins
  let winner = 3;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (areEqual([board[row][col], board[row][col + 1], board[row][col + 2], board[row][col + 3]])) return board[row][col];
    }
  }
  //check vertical wins
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (areEqual([board[row][col], board[row + 1][col], board[row + 2][col], board[row + 3][col]])) return board[row][col];
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {   
      if (areEqual([board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3]])) return board[row][col];
    } 
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 3; col < 7; col++) {   
      if (areEqual([board[row][col], board[row + 1][col - 1], board[row + 2][col - 2], board[row + 3][col - 3]])) return board[row][col];
    }
  }

  for (let col = 0; col < 7; col++) {
    if (board[0][col] === 0) {
      winner = 0;
    }
  }
  return winner;
}

function playComputerMove(board, player) {
  const possibleMoves = [];
  let bestMove = 0;
  let numBestMoveWins = 0;
  for (let col = 0; col < 7; col++) {
    if (board[0][col] === 0) {
      possibleMoves.push(col);
    }
  }

  possibleMoves.forEach((move) => {
    let possibleMoveWins = findBestMove(move, board, player)
    if (numBestMoveWins < possibleMoveWins) {
      numBestMoveWins = possibleMoveWins;
      bestMove = move;
    }
  })

  playMoveOnBoard(bestMove, board, player);
  
}

function findBestMove(column, board, player) {
  let numWins = 0;

  let tempBoard = JSON.parse(JSON.stringify(board));
  playMoveOnBoard(column, tempBoard, player)
  for (let sim = 0; sim < props.settings.difficulty; sim++) {
    let simBoard = structuredClone(tempBoard);
    if (simulateGame(simBoard, player) === player) {
      numWins++;
    }
  }
  return numWins;
}

function simulateGame(board, player) {
  let flag = checkGameWon(board);
  let currPlayer = 3 - player;
  while (flag === 0) {
    let move = Math.floor(Math.random() * 8);
    if (playMoveOnBoard(move, board, currPlayer) === true) {
      flag = checkGameWon(board);
      currPlayer = 3 - currPlayer;
    }
  }
  return flag;

}

function playMoveOnBoard(column, board, player) {
  if (checkGameWon(board)) { return false };
  for (let i = 5; i >= 0; i--) {
    if (board[i][column] === 0) {
      board[i][column] = player;
      return true;
    }
  }
  return false;
} 


function playMove(e) {
  if (winner === 0) {
    let newBoard = JSON.parse(JSON.stringify(boardState));
    playMoveOnBoard(e[1], newBoard, player);
    playComputerMove(newBoard, 3 - player);
    let winnerTemp = checkGameWon(newBoard);
    setWinner(winnerTemp);
    setBoardState(newBoard);
  }
}

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 7; j++) {
    board.push(<Cell row = {i} col = {j} value={boardState[i][j]} onMove={playMove}/>)
  }
}

return(
  <div className="grid-container">
    <div className="grid">
      {board}
    </div>
  </div>);
}
