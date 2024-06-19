import { useState } from 'react';

const usePieceMovement = (pieces, turn, enPassant, columns, rows) => {
  const [possibleMoves, setPossibleMoves] = useState([]);
  

  const handleMouseDown = (piece, rowIndex, columnIndex) => {
    if (piece.color !== turn) return;

    if (piece.type === 'pawn') {
      const oppositeColorPieces = Object.values(pieces).flat().filter((p) => p.color !== piece.color);
      const sameColorPieces = Object.values(pieces).flat().filter((p) => p.color === piece.color);
    
      if (piece.type === 'pawn' && enPassant) {
        const isNextToEnPassantPawn = Math.abs(enPassant.pos_x - columnIndex) === 1;
        const isOnCorrectRow = piece.color === 'white' ? rowIndex === 4 : rowIndex === 3;
  
        if (isNextToEnPassantPawn && isOnCorrectRow) {
          possibleMoves.push({ x: enPassant.pos_x, y: piece.color === 'white' ? rowIndex + 1 : rowIndex - 1, canTake: true, enPassant: true });
        }
      }
      // Check forward move

      if (piece.first_move) {
        for (let i = 1; i <= 2; i++) {
          const moveY = piece.color === 'white' ? rowIndex + i : rowIndex - i;
          const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === moveY);
          const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === moveY);
    
          if (isOccupiedBySameColor || isOccupiedByOppositeColor) {
            break;
          }
    
          possibleMoves.push({ x: columnIndex, y: moveY, canTake: false });
        }
      } else {
        const moveY = piece.color === 'white' ? rowIndex + 1 : rowIndex - 1;
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === moveY);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === moveY);
    
        if (!isOccupiedBySameColor && !isOccupiedByOppositeColor) {
          possibleMoves.push({ x: columnIndex, y: moveY, canTake: false });
        }
      }
  
      // Check diagonal moves
    for (let i = -1; i <= 1; i += 2) {
      const moveX = columnIndex + i;
      const moveY = piece.color === 'white' ? rowIndex + 1 : rowIndex - 1;
      const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === moveX && p.pos_y === moveY);
  
      if (isOccupiedByOppositeColor) {
        possibleMoves.push({ x: moveX, y: moveY, canTake: true });
      }
    }
  
    // Highlight possible moves
    possibleMoves.forEach((move) => {
      const square = document.querySelector(`.row:nth-child(${move.y + 1}) .square:nth-child(${move.x + 1})`);
      square.classList.add(move.canTake ? 'can-take' : 'possible-move');
    });
  }
    
    if (piece.type === 'rook') {
      const oppositeColorPieces = Object.values(pieces).flat().filter((p) => p.color !== piece.color);
      const sameColorPieces = Object.values(pieces).flat().filter((p) => p.color === piece.color);
  
      // Check horizontal moves
      for (let i = columnIndex + 1; i < columns.length; i++) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
  
        if (isOccupiedBySameColor) {
          break;
        }
  
        possibleMoves.push({ x: i, y: rowIndex, canTake: !!isOccupiedByOppositeColor });
  
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
  
      for (let i = columnIndex - 1; i >= 0; i--) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
  
        if (isOccupiedBySameColor) {
          break;
        }
  
        possibleMoves.push({ x: i, y: rowIndex, canTake: !!isOccupiedByOppositeColor });
  
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
  
      // Check vertical moves
      for (let i = rowIndex + 1; i < rows.length; i++) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === i);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === i);
  
        if (isOccupiedBySameColor) {
          break;
        }
  
        possibleMoves.push({ x: columnIndex, y: i, canTake: !!isOccupiedByOppositeColor });
  
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
  
      for (let i = rowIndex - 1; i >= 0; i--) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === i);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === i);
  
        if (isOccupiedBySameColor) {
          break;
        }
  
        possibleMoves.push({ x: columnIndex, y: i, canTake: !!isOccupiedByOppositeColor });
  
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
  
      // Highlight possible moves
      possibleMoves.forEach((move) => {
        const square = document.querySelector(`.row:nth-child(${move.y + 1}) .square:nth-child(${move.x + 1})`);
        square.classList.add(move.canTake ? 'can-take' : 'possible-move');
      });
    }
    if (piece.type === 'bishop') {
      const oppositeColorPieces = Object.values(pieces).flat().filter((p) => p.color !== piece.color);
      const sameColorPieces = Object.values(pieces).flat().filter((p) => p.color === piece.color);
    
      // Check top-right diagonal
      for (let i = columnIndex + 1, j = rowIndex - 1; i < columns.length && j >= 0; i++, j--) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: i, y: j, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      // Check bottom-right diagonal
      for (let i = columnIndex + 1, j = rowIndex + 1; i < columns.length && j < rows.length; i++, j++) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: i, y: j, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      // Check top-left diagonal
      for (let i = columnIndex - 1, j = rowIndex - 1; i >= 0 && j >= 0; i--, j--) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: i, y: j, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      // Check bottom-left diagonal
      for (let i = columnIndex - 1, j = rowIndex + 1; i >= 0 && j < rows.length; i--, j++) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: i, y: j, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      // Highlight possible moves
      possibleMoves.forEach((move) => {
        const square = document.querySelector(`.row:nth-child(${move.y + 1}) .square:nth-child(${move.x + 1})`);
        square.classList.add(move.canTake ? 'can-take' : 'possible-move');
      });
    }
    if (piece.type === 'knight') {
      const oppositeColorPieces = Object.values(pieces).flat().filter((p) => p.color !== piece.color);
      const sameColorPieces = Object.values(pieces).flat().filter((p) => p.color === piece.color);
    
      // All possible moves for a knight
      const moves = [
        { x: columnIndex + 1, y: rowIndex - 2 }, // up 2, right 1
        { x: columnIndex + 2, y: rowIndex - 1 }, // up 1, right 2
        { x: columnIndex + 2, y: rowIndex + 1 }, // down 1, right 2
        { x: columnIndex + 1, y: rowIndex + 2 }, // down 2, right 1
        { x: columnIndex - 1, y: rowIndex - 2 }, // up 2, left 1
        { x: columnIndex - 2, y: rowIndex - 1 }, // up 1, left 2
        { x: columnIndex - 2, y: rowIndex + 1 }, // down 1, left 2
        { x: columnIndex - 1, y: rowIndex + 2 }, // down 2, left 1
      ];
    
      // Check each move
      moves.forEach((move) => {
        if (move.x >= 0 && move.x < columns.length && move.y >= 0 && move.y < rows.length) {
          const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === move.x && p.pos_y === move.y);
          const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === move.x && p.pos_y === move.y);
    
          if (!isOccupiedBySameColor) {
            possibleMoves.push({ x: move.x, y: move.y, canTake: !!isOccupiedByOppositeColor });
          }
        }
      });
    
      // Highlight possible moves
      possibleMoves.forEach((move) => {
        const square = document.querySelector(`.row:nth-child(${move.y + 1}) .square:nth-child(${move.x + 1})`);
        square.classList.add(move.canTake ? 'can-take' : 'possible-move');
      });
    }
    if (piece.type === 'king') {

      
      const oppositeColorPieces = Object.values(pieces).flat().filter((p) => p.color !== piece.color);
      const sameColorPieces = Object.values(pieces).flat().filter((p) => p.color === piece.color);

      
    
      // All possible moves for a king
      const moves = [
        { x: columnIndex + 1, y: rowIndex - 1 }, // up right
        { x: columnIndex + 1, y: rowIndex }, // right
        { x: columnIndex + 1, y: rowIndex + 1 }, // down right
        { x: columnIndex, y: rowIndex - 1 }, // up
        { x: columnIndex, y: rowIndex + 1 }, // down
        { x: columnIndex - 1, y: rowIndex - 1 }, // up left
        { x: columnIndex - 1, y: rowIndex }, // left
        { x: columnIndex - 1, y: rowIndex + 1 }, // down left
      ];
    
      // Check each move
      moves.forEach((move) => {
        if (move.x >= 0 && move.x < columns.length && move.y >= 0 && move.y < rows.length) {
          const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === move.x && p.pos_y === move.y);
          const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === move.x && p.pos_y === move.y);
    
          if (!isOccupiedBySameColor) {
            possibleMoves.push({ x: move.x, y: move.y, canTake: !!isOccupiedByOppositeColor });
          }
        }
      });
/// logic for castling:
if (piece.first_move) {
  // Check for king-side castle
  const kingSideRook = sameColorPieces.find((p) => p.type === 'rook' && p.pos_x === 7 && p.pos_y === rowIndex && p.first_move);
  if (kingSideRook) {
    let canCastleKingSide = true;
    for (let i = columnIndex + 1; i < 7; i++) {
      const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
      const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
      if (isOccupiedByOppositeColor || isOccupiedBySameColor) {
        canCastleKingSide = false;
        break;
      }
    }
    if (canCastleKingSide) {
      possibleMoves.push({ x: columnIndex + 2, y: rowIndex, canTake: false, castle: true });
    }
  }

  // Check for queen-side castle
  const queenSideRook = sameColorPieces.find((p) => p.type === 'rook' && p.pos_x === 0 && p.pos_y === rowIndex && p.first_move);
  if (queenSideRook) {
    let canCastleQueenSide = true;
    for (let i = columnIndex - 1; i > 0; i--) {
      const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
      const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
      if (isOccupiedByOppositeColor || isOccupiedBySameColor) {
        canCastleQueenSide = false;
        break;
      }
    }
    if (canCastleQueenSide) {
      possibleMoves.push({ x: columnIndex - 2, y: rowIndex, canTake: false, castle: true });
    }
  }
}
      



    
      // Highlight possible moves
      possibleMoves.forEach((move) => {
        const square = document.querySelector(`.row:nth-child(${move.y + 1}) .square:nth-child(${move.x + 1})`);
        square.classList.add(move.canTake ? 'can-take' : 'possible-move');
      });
    }
    if (piece.type === 'queen') {
      const oppositeColorPieces = Object.values(pieces).flat().filter((p) => p.color !== piece.color);
      const sameColorPieces = Object.values(pieces).flat().filter((p) => p.color === piece.color);
    
      // Check horizontal moves
      for (let i = columnIndex + 1; i < columns.length; i++) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: i, y: rowIndex, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      for (let i = columnIndex - 1; i >= 0; i--) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === rowIndex);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: i, y: rowIndex, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      // Check vertical moves
      for (let i = rowIndex + 1; i < rows.length; i++) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === i);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === i);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: columnIndex, y: i, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      for (let i = rowIndex - 1; i >= 0; i--) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === i);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === columnIndex && p.pos_y === i);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: columnIndex, y: i, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      // Check top-right diagonal
      for (let i = columnIndex + 1, j = rowIndex - 1; i < columns.length && j >= 0; i++, j--) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: i, y: j, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      // Check bottom-right diagonal
      for (let i = columnIndex + 1, j = rowIndex + 1; i < columns.length && j < rows.length; i++, j++) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: i, y: j, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      // Check top-left diagonal
      for (let i = columnIndex - 1, j = rowIndex - 1; i >= 0 && j >= 0; i--, j--) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: i, y: j, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      // Check bottom-left diagonal
      for (let i = columnIndex - 1, j = rowIndex + 1; i >= 0 && j < rows.length; i--, j++) {
        const isOccupiedByOppositeColor = oppositeColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
        const isOccupiedBySameColor = sameColorPieces.find((p) => p.pos_x === i && p.pos_y === j);
    
        if (isOccupiedBySameColor) {
          break;
        }
    
        possibleMoves.push({ x: i, y: j, canTake: !!isOccupiedByOppositeColor });
    
        if (isOccupiedByOppositeColor) {
          break;
        }
      }
    
      // Highlight possible moves
      possibleMoves.forEach((move) => {
        const square = document.querySelector(`.row:nth-child(${move.y + 1}) .square:nth-child(${move.x + 1})`);
        square.classList.add(move.canTake ? 'can-take' : 'possible-move');
      });
    }
    
    setPossibleMoves(possibleMoves);

  };
  return { possibleMoves, handleMouseDown, setPossibleMoves };
};

export default usePieceMovement;