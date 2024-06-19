import { useState } from 'react';

const initialPieces = {
    white: [
        { chess_id: 'white_rook_a', pos_x: 0, pos_y: 0, color: 'white', first_move: true, type: 'rook' },
        { chess_id: 'white_knight_b', pos_x: 1, pos_y: 0, color: 'white', first_move: true, type: 'knight' },
        { chess_id: 'white_bishop_c', pos_x: 2, pos_y: 0, color: 'white', first_move: true, type: 'bishop' },
        { chess_id: 'white_queen_d', pos_x: 4, pos_y: 0, color: 'white', first_move: true, type: 'queen' },
        { chess_id: 'white_king_e', pos_x: 3, pos_y: 0, color: 'white', first_move: true, type: 'king' },
        { chess_id: 'white_bishop_f', pos_x: 5, pos_y: 0, color: 'white', first_move: true, type: 'bishop' },
        { chess_id: 'white_knight_g', pos_x: 6, pos_y: 0, color: 'white', first_move: true, type: 'knight' },
        { chess_id: 'white_rook_h', pos_x: 7, pos_y: 0, color: 'white', first_move: true, type: 'rook' },
        { chess_id: 'white_pawn_a', pos_x: 0, pos_y: 1, color: 'white', first_move: true, type: 'pawn' },
        { chess_id: 'white_pawn_b', pos_x: 1, pos_y: 1, color: 'white', first_move: true, type: 'pawn' },
        { chess_id: 'white_pawn_c', pos_x: 2, pos_y: 1, color: 'white', first_move: true, type: 'pawn' },
        { chess_id: 'white_pawn_d', pos_x: 3, pos_y: 1, color: 'white', first_move: true, type: 'pawn' },
        { chess_id: 'white_pawn_e', pos_x: 4, pos_y: 1, color: 'white', first_move: true, type: 'pawn' },
        { chess_id: 'white_pawn_f', pos_x: 5, pos_y: 1, color: 'white', first_move: true, type: 'pawn' },
        { chess_id: 'white_pawn_g', pos_x: 6, pos_y: 1, color: 'white', first_move: true, type: 'pawn' },
        { chess_id: 'white_pawn_h', pos_x: 7, pos_y: 1, color: 'white', first_move: true, type: 'pawn' },
        // ... pawns ...
      ],
      black: [
        
          { chess_id: 'black_rook_a', pos_x: 0, pos_y: 7, color: 'black', first_move: true, type: 'rook' },
          { chess_id: 'black_knight_b', pos_x: 1, pos_y: 7, color: 'black', first_move: true, type: 'knight' },
          { chess_id: 'black_bishop_c', pos_x: 2, pos_y: 7, color: 'black', first_move: true, type: 'bishop' },
          { chess_id: 'black_queen_d', pos_x: 3, pos_y: 7, color: 'black', first_move: true, type: 'queen' },
          { chess_id: 'black_king_e', pos_x: 4, pos_y: 7, color: 'black', first_move: true, type: 'king' },
          { chess_id: 'black_bishop_f', pos_x: 5, pos_y: 7, color: 'black', first_move: true, type: 'bishop' },
          { chess_id: 'black_knight_g', pos_x: 6, pos_y: 7, color: 'black', first_move: true, type: 'knight' },
          { chess_id: 'black_rook_h', pos_x: 7, pos_y: 7, color: 'black', first_move: true, type: 'rook' },
          { chess_id: 'black_pawn_a', pos_x: 0, pos_y: 6, color: 'black', first_move: true, type: 'pawn' },
          { chess_id: 'black_pawn_b', pos_x: 1, pos_y: 6, color: 'black', first_move: true, type: 'pawn' },
          { chess_id: 'black_pawn_c', pos_x: 2, pos_y: 6, color: 'black', first_move: true, type: 'pawn' },
          { chess_id: 'black_pawn_d', pos_x: 3, pos_y: 6, color: 'black', first_move: true, type: 'pawn' },
          { chess_id: 'black_pawn_e', pos_x: 4, pos_y: 6, color: 'black', first_move: true, type: 'pawn' },
          { chess_id: 'black_pawn_f', pos_x: 5, pos_y: 6, color: 'black', first_move: true, type: 'pawn' },
          { chess_id: 'black_pawn_g', pos_x: 6, pos_y: 6, color: 'black', first_move: true, type: 'pawn' },
          { chess_id: 'black_pawn_h', pos_x: 7, pos_y: 6, color: 'black', first_move: true, type: 'pawn' },
        // ... similar to white pieces ...
      
  ],
};

const useChessPieces = () => {
  const [pieces, setPieces] = useState(initialPieces);

  return { pieces, setPieces };
};

export default useChessPieces;