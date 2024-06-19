// hooks/useInitializeBoard.js
import { useEffect } from 'react';

const useInitializeBoard = (setBoard) => {
  useEffect(() => {
    const newBoard = [];
    for (let i = 0; i < 8; i++) {
      newBoard.push([]);
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 1) {
          if (i < 3) {
            newBoard[i].push('X');
          } else if (i > 4) {
            newBoard[i].push('O');
          } else {
            newBoard[i].push('');
          }
        } else {
          newBoard[i].push('');
        }
      }
    }
    setBoard(newBoard);
  }, [setBoard]);
};

export default useInitializeBoard;