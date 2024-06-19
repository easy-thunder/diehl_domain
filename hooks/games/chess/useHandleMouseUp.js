import { useCallback } from 'react';

const useHandleMouseUp = (possibleMoves, setPossibleMoves) => {
  const handleMouseUp = useCallback(() => {
    possibleMoves.forEach((move) => {
      const square = document.querySelector(`.row:nth-child(${move.y + 1}) .square:nth-child(${move.x + 1})`);
      square.classList.remove('possible-move', 'can-take');
    });
    setPossibleMoves([]);
  }, [possibleMoves, setPossibleMoves]);

  return handleMouseUp;
};

export default useHandleMouseUp;