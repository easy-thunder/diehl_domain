

const useGetPossibleMoves = (i,j,board,turn, setJumpedPieces) => {
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
          }    } else {
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

    return [moves];
  };


export default useGetPossibleMoves;