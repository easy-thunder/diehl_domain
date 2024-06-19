import { useCallback } from 'react';

const useHandleDragStart = (handleMouseDown) => {
  const handleDragStart = useCallback((piece) => {
    const possibleMoves = handleMouseDown(piece, piece.pos_y, piece.pos_x);
    return possibleMoves;
  }, [handleMouseDown]);

  return handleDragStart;
};

export default useHandleDragStart;