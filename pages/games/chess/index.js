import React, { useState } from 'react';
import usePieceMovement from '@/hooks/games/chess/usePieceMovement';
import useChessPieces from '@/hooks/games/chess/useChessPieces';
import useHandleDragEnd from '@/hooks/games/chess/useHandleDragEnd';
import useHandleMouseUp from '@/hooks/games/chess/useHandleMouseUp';
import useHandleDragStart from '@/hooks/games/chess/useHandleDragStart';

const Chess = () => {
  const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const { pieces, setPieces } = useChessPieces();

  const [turn, setTurn] = useState('white'); // Add this line
  const [enPassant, setEnPassant] = useState(null); // Add this line

  


  const { possibleMoves, handleMouseDown, setPossibleMoves } = usePieceMovement(pieces, turn, enPassant, columns, rows);
  const handleMouseUp = useHandleMouseUp(possibleMoves, setPossibleMoves);
  const handleDragStart = useHandleDragStart(handleMouseDown);
  const handleDragEnd = useHandleDragEnd(pieces, turn, enPassant, setPieces, setEnPassant, setTurn, possibleMoves, handleMouseUp);




  return (
    <div className="chessboard" onMouseUp={handleMouseUp}>
      {rows.map((row, rowIndex) => (
        <div key={row} className="row">
          {columns.map((column, columnIndex) => {
            const piece = pieces.white.find((p) => p.pos_x === columnIndex && p.pos_y === rowIndex) || pieces.black.find((p) => p.pos_x === columnIndex && p.pos_y === rowIndex);
  
            return (
              <div
                key={column}
                className={`square ${getSquareColor(rowIndex, columnIndex)}`}
                onMouseDown={() => piece && handleMouseDown(piece, rowIndex, columnIndex)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
              >
                {piece && (
                  <span
                    draggable
                    onDragStart={() => handleDragStart(piece)}
                    onDragEnd={(e) => handleDragEnd(e, piece)}
                    className={piece.type}
                  >
                    {getPieceSymbol(piece.type, piece.color)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  function getSquareColor(rowIndex, columnIndex) {
    return (rowIndex + columnIndex) % 2 === 1 ? 'black' : 'white';
  }

  function getSquareColor(rowIndex, columnIndex) {
    return (rowIndex + columnIndex) % 2 === 1 ? 'black' : 'white';
  }

  function getPieceSymbol(type, color) {
    switch (type) {
      case 'king':
        return color === 'white' ? '\u2654' : '\u265A';
      case 'queen':
        return color === 'white' ? '\u2655' : '\u265B';
      case 'rook':
        return color === 'white' ? '\u2656' : '\u265C';
      case 'bishop':
        return color === 'white' ? '\u2657' : '\u265D';
      case 'knight':
        return color === 'white' ? '\u2658' : '\u265E';
      case 'pawn':
        return color === 'white' ? '\u2659' : '\u265F';
      default:
        return '';
    }
  }
};

export default Chess;