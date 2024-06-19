// import { useCallback } from 'react';
// import usePieceMovement from '@/hooks/usePieceMovement';

// const useHandleDragEnd = (pieces, turn, enPassant, setPieces, setTurn, setEnPassant, handleMouseUp) => {
//     const { possibleMoves, handleMouseDown, setPossibleMoves } = usePieceMovement(pieces, turn, enPassant);
//     const handleDragEnd = useCallback((e, piece) => {
//             if (piece.color !== turn) return; // Add this line
        
//             const chessboardRect = document.querySelector('.chessboard').getBoundingClientRect();
//             const mouseX = e.clientX - chessboardRect.left;
//             const mouseY = e.clientY - chessboardRect.top;
//             const squareSize = chessboardRect.width / 8;
//             const targetRowIndex = Math.floor(mouseY / squareSize);
//             const targetColumnIndex = Math.floor(mouseX / squareSize)
//             const rowIndex = piece.pos_y;
//             const columnIndex = piece.pos_x; // Define columnIndex here
          
//             const isValidMove = possibleMoves.find((move) => move.x === targetColumnIndex && move.y === targetRowIndex);
          
//             if (isValidMove) {
//               setPieces((prevPieces) => {
//                 const updatedPieces = { ...prevPieces };
//                 const pieceIndex = updatedPieces[piece.color].findIndex((p) => p.chess_id === piece.chess_id);
//                 updatedPieces[piece.color][pieceIndex].pos_x = targetColumnIndex;
//                 updatedPieces[piece.color][pieceIndex].pos_y = targetRowIndex;
          
//                 // Set first_move to false after the piece has made its first move
//                 updatedPieces[piece.color][pieceIndex].first_move = false;
        
        
          
//                 // Castle move
//                 if (isValidMove.castle) {
//                   let rook;
//                   if (targetColumnIndex > columnIndex) {
//                     // King-side castle
//                     rook = updatedPieces[piece.color].find((p) => p.type === 'rook' && p.pos_y === rowIndex && p.pos_x === 7);
//                   } else {
//                     // Queen-side castle
//                     rook = updatedPieces[piece.color].find((p) => p.type === 'rook' && p.pos_y === rowIndex && p.pos_x === 0);
//                   }
//                   const rookIndex = updatedPieces[piece.color].findIndex((p) => p.chess_id === rook.chess_id);
//                   if (targetColumnIndex > columnIndex) {
//                     // King-side castle
//                     updatedPieces[piece.color][rookIndex].pos_x = targetColumnIndex - 1;
//                   } else {
//                     // Queen-side castle
//                     updatedPieces[piece.color][rookIndex].pos_x = targetColumnIndex + 1;
//                   }
//                 }
//                 if (piece.type === 'pawn' && Math.abs(targetRowIndex - rowIndex) === 2) {
//                   setEnPassant(piece);
//                 } else {
//                   setEnPassant(null);
//                 }
          
//                 // Remove the opponent's piece if it's on the target square
//                 const opponentColor = piece.color === 'white' ? 'black' : 'white';
//                 const opponentPieceIndex = updatedPieces[opponentColor].findIndex((p) => p.pos_x === targetColumnIndex && p.pos_y === targetRowIndex);
//                 if (opponentPieceIndex !== -1) {
//                   updatedPieces[opponentColor].splice(opponentPieceIndex, 1);
//                 }
        
//                 // If En Passant, remove the pawn that was passed
//                 if (isValidMove.enPassant) {
//                   const enPassantPieceIndex = updatedPieces[opponentColor].findIndex((p) => p.chess_id === enPassant.chess_id);
//                   updatedPieces[opponentColor].splice(enPassantPieceIndex, 1);
//                 }
        
//                 // Set En Passant
//                 if (piece.type === 'pawn' && Math.abs(targetRowIndex - rowIndex) === 2) {
//                   setEnPassant(piece);
//                 } else {
//                   setEnPassant(null);
//                 }
        
//                 setTurn(turn === 'white' ? 'black' : 'white'); // Add this line
        
//                 return updatedPieces;
//               });
        
//             }
            
//             handleMouseUp()
          
//         // your code here
//       }, [pieces, turn, enPassant, setPieces, setTurn, setEnPassant]);
    
//       return handleDragEnd;
//     };
    
//     export default useHandleDragEnd;

    import { useCallback } from 'react';

const useHandleDragEnd = (pieces, turn, enPassant, setPieces, setEnPassant, setTurn, possibleMoves, handleMouseUp) => {
  const handleDragEnd = useCallback((e, piece) => {
                if (piece.color !== turn) return; // Add this line
        
            const chessboardRect = document.querySelector('.chessboard').getBoundingClientRect();
            const mouseX = e.clientX - chessboardRect.left;
            const mouseY = e.clientY - chessboardRect.top;
            const squareSize = chessboardRect.width / 8;
            const targetRowIndex = Math.floor(mouseY / squareSize);
            const targetColumnIndex = Math.floor(mouseX / squareSize)
            const rowIndex = piece.pos_y;
            const columnIndex = piece.pos_x; // Define columnIndex here
          
            const isValidMove = possibleMoves.find((move) => move.x === targetColumnIndex && move.y === targetRowIndex);
          
            if (isValidMove) {
              setPieces((prevPieces) => {
                const updatedPieces = { ...prevPieces };
                const pieceIndex = updatedPieces[piece.color].findIndex((p) => p.chess_id === piece.chess_id);
                updatedPieces[piece.color][pieceIndex].pos_x = targetColumnIndex;
                updatedPieces[piece.color][pieceIndex].pos_y = targetRowIndex;
          
                // Set first_move to false after the piece has made its first move
                updatedPieces[piece.color][pieceIndex].first_move = false;
        
        
          
                // Castle move
                if (isValidMove.castle) {
                  let rook;
                  if (targetColumnIndex > columnIndex) {
                    // King-side castle
                    rook = updatedPieces[piece.color].find((p) => p.type === 'rook' && p.pos_y === rowIndex && p.pos_x === 7);
                  } else {
                    // Queen-side castle
                    rook = updatedPieces[piece.color].find((p) => p.type === 'rook' && p.pos_y === rowIndex && p.pos_x === 0);
                  }
                  const rookIndex = updatedPieces[piece.color].findIndex((p) => p.chess_id === rook.chess_id);
                  if (targetColumnIndex > columnIndex) {
                    // King-side castle
                    updatedPieces[piece.color][rookIndex].pos_x = targetColumnIndex - 1;
                  } else {
                    // Queen-side castle
                    updatedPieces[piece.color][rookIndex].pos_x = targetColumnIndex + 1;
                  }
                }
                if (piece.type === 'pawn' && Math.abs(targetRowIndex - rowIndex) === 2) {
                  setEnPassant(piece);
                } else {
                  setEnPassant(null);
                }
          
                // Remove the opponent's piece if it's on the target square
                const opponentColor = piece.color === 'white' ? 'black' : 'white';
                const opponentPieceIndex = updatedPieces[opponentColor].findIndex((p) => p.pos_x === targetColumnIndex && p.pos_y === targetRowIndex);
                if (opponentPieceIndex !== -1) {
                  updatedPieces[opponentColor].splice(opponentPieceIndex, 1);
                }
        
                // If En Passant, remove the pawn that was passed
                if (isValidMove.enPassant) {
                  const enPassantPieceIndex = updatedPieces[opponentColor].findIndex((p) => p.chess_id === enPassant.chess_id);
                  updatedPieces[opponentColor].splice(enPassantPieceIndex, 1);
                }
        
                // Set En Passant
                if (piece.type === 'pawn' && Math.abs(targetRowIndex - rowIndex) === 2) {
                  setEnPassant(piece);
                } else {
                  setEnPassant(null);
                }
        
                setTurn(turn === 'white' ? 'black' : 'white'); // Add this line
        
                return updatedPieces;
              });
        
            }
            
            handleMouseUp()
          
        // your code here

}, [pieces, turn, enPassant, setPieces, setEnPassant, setTurn]);

  return handleDragEnd;
};

export default useHandleDragEnd;