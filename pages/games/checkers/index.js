// pages/games/checkers/index.js
import { useState } from 'react';
import styles from './Checkers.module.css';
import useInitializeBoard from '/hooks/games/checkers/useInitializeBoard';

function Checkers() {
  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState('X');
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState({});
  const [jumpedPieces, setJumpedPieces] = useState({});
  const [lastMovedPiece, setLastMovedPiece] = useState(null);
  
  useInitializeBoard( setBoard);


  const handleSelectPiece = (i, j) => {
    if (selectedPiece && selectedPiece[0] === i && selectedPiece[1] === j) {
      setSelectedPiece(null);
      setPossibleMoves({});
      setJumpedPieces({});
    } else if (board[i][j] === turn || (board[i][j] === 'K' + turn && turn === 'X') || (board[i][j] === 'K' + turn && turn === 'O')) {
      setSelectedPiece([i, j]);
      const moves = getPossibleMoves(i, j);
      setPossibleMoves(moves);
    }
  };

  const handleMovePiece = (i, j) => {
    if (possibleMoves[`${i},${j}`]) {
      const newBoard = [...board];
      newBoard[i][j] = turn === 'X' && i === 7 ? 'KX' : turn === 'O' && i === 0 ? 'KO' : board[selectedPiece[0]][selectedPiece[1]];
      newBoard[selectedPiece[0]][selectedPiece[1]] = '';
      let tookPiece = false;
      if (jumpedPieces[`${i},${j}`]) {
        newBoard[jumpedPieces[`${i},${j}`][0]][jumpedPieces[`${i},${j}`][1]] = '';
        tookPiece = true;
      }
      setBoard(newBoard);
      if (tookPiece) {
        const newMoves = getPossibleMoves(i, j);
        const hasJumps = Object.keys(newMoves).some(move => Math.abs(move.split(',')[0] - i) > 1);
        if (hasJumps) {
          setSelectedPiece([i, j]);
          const filteredMoves = {};
          Object.keys(newMoves).forEach(move => {
            if (Math.abs(move.split(',')[0] - i) > 1) {
              filteredMoves[move] = true;
            }
          });
          setPossibleMoves(filteredMoves);
          setLastMovedPiece([i, j]);
        } else {
          setTurn(turn === 'X' ? 'O' : 'X');
          setSelectedPiece(null);
          setPossibleMoves({});
          setJumpedPieces({});
          setLastMovedPiece(null);
        }
      } else {
        setTurn(turn === 'X' ? 'O' : 'X');
        setSelectedPiece(null);
        setPossibleMoves({});
        setJumpedPieces({});
        setLastMovedPiece(null);
      }
    } else {
      setSelectedPiece(null);
      setPossibleMoves({});
      setJumpedPieces({});
      setLastMovedPiece(null);
    }
  };

  const getPossibleMoves = (i, j) => {
    const moves = {};
    const jumped = {};
    if (turn === 'X') {
      if (i + 1 < 8 && j + 1 < 8 && board[i + 1][j + 1] === '') {
        moves[`${i + 1},${j + 1}`] = true;
      }
      if (i + 1 < 8 && j - 1 >= 0 && board[i + 1][j - 1] === '') {
        moves[`${i + 1},${j - 1}`] = true;
      }
      if (i + 2 < 8 && j + 2 < 8 && (board[i + 1][j + 1] === 'O' || board[i + 1][j + 1] === 'KO') && board[i + 2][j + 2] === '') {
        moves[`${i + 2},${j + 2}`] = true;
        jumped[`${i + 2},${j + 2}`] = [i + 1, j + 1];
      }
      if (i + 2 < 8 && j - 2 >= 0 && (board[i + 1][j - 1] === 'O' || board[i + 1][j - 1] === 'KO') && board[i + 2][j - 2] === '') {
        moves[`${i + 2},${j - 2}`] = true;
        jumped[`${i + 2},${j - 2}`] = [i + 1, j - 1];
      }
      if (board[i][j] === 'KX') {
        if (i - 1 >= 0 && j + 1 < 8 && board[i - 1][j + 1] === '') {
          moves[`${i - 1},${j + 1}`] = true;
        }
        if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1] === '') {
          moves[`${i - 1},${j - 1}`] = true;
        }
        if (i - 2 >= 0 && j + 2 < 8 && (board[i - 1][j + 1] === 'O' || board[i - 1][j + 1] === 'KO') && board[i - 2][j + 2] === '') {
          moves[`${i - 2},${j + 2}`] = true;
          jumped[`${i - 2},${j + 2}`] = [i - 1, j + 1];
        }
        if (i - 2 >= 0 && j - 2 >= 0 && (board[i - 1][j - 1] === 'O' || board[i - 1][j - 1] === 'KO') && board[i - 2][j - 2] === '') {
          moves[`${i - 2},${j - 2}`] = true;
          jumped[`${i - 2},${j - 2}`] = [i - 1, j - 1];
        }
      }
    } else {
      if (i - 1 >= 0 && j + 1 < 8 && board[i - 1][j + 1] === '') {
        moves[`${i - 1},${j + 1}`] = true;
      }
      if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1] === '') {
        moves[`${i - 1},${j - 1}`] = true;
      }
      if (i - 2 >= 0 && j + 2 < 8 && (board[i - 1][j + 1] === 'X' || board[i - 1][j + 1] === 'KX') && board[i - 2][j + 2] === '') {
        moves[`${i - 2},${j + 2}`] = true;
        jumped[`${i - 2},${j + 2}`] = [i - 1, j + 1];
      }
      if (i - 2 >= 0 && j - 2 >= 0 && (board[i - 1][j - 1] === 'X' || board[i - 1][j - 1] === 'KX') && board[i - 2][j - 2] === '') {
        moves[`${i - 2},${j - 2}`] = true;
        jumped[`${i - 2},${j - 2}`] = [i - 1, j - 1];
      }
      if (board[i][j] === 'KO') {
        if (i + 1 < 8 && j + 1 < 8 && board[i + 1][j + 1] === '') {
          moves[`${i + 1},${j + 1}`] = true;
        }
        if (i + 1 < 8 && j - 1 >= 0 && board[i + 1][j - 1] === '') {
          moves[`${i + 1},${j - 1}`] = true;
        }
        if (i + 2 < 8 && j + 2 < 8 && (board[i + 1][j + 1] === 'X' || board[i + 1][j + 1] === 'KX') && board[i + 2][j + 2] === '') {
          moves[`${i + 2},${j + 2}`] = true;
          jumped[`${i + 2},${j + 2}`] = [i + 1, j + 1];
        }
        if (i + 2 < 8 && j - 2 >= 0 && (board[i + 1][j - 1] === 'X' || board[i + 1][j - 1] === 'KX') && board[i + 2][j - 2] === '') {
          moves[`${i + 2},${j - 2}`] = true;
          jumped[`${i + 2},${j - 2}`] = [i + 1, j - 1];
        }
      }
    }
    setJumpedPieces(jumped);
    return moves;
  };

  return (
    <div className={styles.board}>
      {board.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((cell, j) => (
            <div
              key={j}
              className={`${styles.cell} ${possibleMoves[`${i},${j}`] ? styles.possibleMove : ''} ${((i + j) % 2 === 1) ? styles.blackCell : styles.whiteCell}`}
              onClick={() => {
                if (selectedPiece && lastMovedPiece && lastMovedPiece[0] === i && lastMovedPiece[1] === j) {
                  setTurn(turn === 'X' ? 'O' : 'X');
                  setSelectedPiece(null);
                  setPossibleMoves({});
                  setJumpedPieces({});
                  setLastMovedPiece(null);
                } else if (selectedPiece) {
                  handleMovePiece(i, j);
                } else {
                  handleSelectPiece(i, j);
                }
              }}
            >
              {cell === 'X' ? <div className={styles.pieceX} /> : cell === 'O' ? <div className={styles.pieceO} /> : cell === 'KX' ? <div className={styles.kingX} /> : cell === 'KO' ? <div className={styles.kingO} /> : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Checkers;



