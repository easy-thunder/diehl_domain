import useGetPossibleMoves from './useGetPossibleMoves';

const useSelectPiece = (board, turn, selectedPiece, setSelectedPiece, setPossibleMoves, setJumpedPieces) => {
  const handleSelectPiece = (i, j) => {
    if (selectedPiece && selectedPiece[0] === i && selectedPiece[1] === j) {
      setSelectedPiece(null);
      setPossibleMoves({});
      setJumpedPieces({});
    } else if (board[i][j] === turn || (board[i][j] === 'K' + turn && turn === 'X') || (board[i][j] === 'K' + turn && turn === 'O')) {
      setSelectedPiece([i, j]);
      const [moves, jumped] = useGetPossibleMoves(i, j, board, turn);
      setPossibleMoves(moves);
      setJumpedPieces(jumped);
    }
  };

  return handleSelectPiece;
};

export default useSelectPiece;


// import { useState } from 'react';
// import styles from './Checkers.module.css';
// import useInitializeBoard from './hooks/useInitializeBoard';
// import useSelectPiece from './hooks/useSelectPiece';
// import useGetPossibleMoves from './hooks/useGetPossibleMoves';

// function Checkers() {
//   const [board, setBoard] = useState([]);
//   const [turn, setTurn] = useState('X');
//   const [selectedPiece, setSelectedPiece] = useState(null);
//   const [possibleMoves, setPossibleMoves] = useState({});
//   const [jumpedPieces, setJumpedPieces] = useState({});
//   const [lastMovedPiece, setLastMovedPiece] = useState(null);
  
//   useInitializeBoard(setBoard);

//   const handleSelectPiece = useSelectPiece(board, turn, selectedPiece, setSelectedPiece, setPossibleMoves, setJumpedPieces);

//   const handleMovePiece = (i, j) => {
//     if (possibleMoves[`${i},${j}`]) {
//       const newBoard = [...board];
//       newBoard[i][j] = turn === 'X' && i === 7 ? 'KX' : turn === 'O' && i === 0 ? 'KO' : board[selectedPiece[0]][selectedPiece[1]];
//       newBoard[selectedPiece[0]][selectedPiece[1]] = '';
//       let tookPiece = false;
//       if (jumpedPieces[`${i},${j}`]) {
//         newBoard[jumpedPieces[`${i},${j}`][0]][jumpedPieces[`${i},${j}`][1]] = '';
//         tookPiece = true;
//       }
//       setBoard(newBoard);
//       if (tookPiece) {
//         const newMoves = useGetPossibleMoves(i, j, board, turn);
//         const hasJumps = Object.keys(newMoves).some(move => Math.abs(move.split(',')[0] - i) > 1);
// if (hasJumps) {
//     setSelectedPiece([i, j]);
//     const filteredMoves = {};
//     Object.keys(newMoves).forEach(move => {
//       if (Math.abs(move.split(',')[0] - i) > 1) {
//         filteredMoves[move] = true;
//       }
//     });
//     setPossibleMoves(filteredMoves);
//     setLastMovedPiece([i, j]);
//   } 
    // else {
//           setTurn(turn === 'X' ? 'O' : 'X');
//           setSelectedPiece(null);
//           setPossibleMoves({});
//           setJumpedPieces({});
//           setLastMovedPiece(null);
//         }
//       } else {
//         setTurn(turn === 'X' ? 'O' : 'X');
//         setSelectedPiece(null);
//         setPossibleMoves({});
//         setJumpedPieces({});
//         setLastMovedPiece(null);
//       }
//     } else {
//       setTurn(turn === 'X' ? 'O' : 'X');
//       setSelectedPiece(null);
//       setPossibleMoves({});
//       setJumpedPieces({});
//       setLastMovedPiece(null);
//     }
//   };

//   return (
//     <div className={styles.board}>
//       {board.map((row, i) => (
//         <div key={i} className={styles.row}>
//           {row.map((cell, j) => (
//             <div
//               key={j}
//               className={`${styles.cell} ${possibleMoves[`${i},${j}`] ? styles.possibleMove : ''} ${((i + j) % 2 === 1) ? styles.blackCell : styles.whiteCell}`}
//               onClick={() => {
//                 if (selectedPiece && lastMovedPiece && lastMovedPiece[0] === i && lastMovedPiece[1] === j) {
//                   setTurn(turn === 'X' ? 'O' : 'X');
//                   setSelectedPiece(null);
//                   setPossibleMoves({});
//                   setJumpedPieces({});
//                   setLastMovedPiece(null);
//                 } else if (selectedPiece) {
//                   handleMovePiece(i, j);
//                 } else {
//                   handleSelectPiece(i, j);
//                 }
//               }}
//             >
//               {cell === 'X' ? <div className={styles.pieceX} /> : cell === 'O' ? <div className={styles.pieceO} /> : cell === 'KX' ? <div className={styles.kingX} /> : cell === 'KO' ? <div className={styles.kingO} /> : ''}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Checkers;


