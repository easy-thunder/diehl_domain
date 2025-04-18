let game = {
  board: [
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  ],
  currentPlayer: 'R',
  winner: null,
  moveMade: false,
  testingMode: true, // add this flag

  
};
export default async function handler(req, res) {
    if (req.method === 'GET') {
      return res.json(game);
    } else if (req.method === 'POST') {
      const { action, moveDisk, moveRow, moveCol, spinDisk, spinDirection } = req.body;
      if (action === 'move') {
        
        if (game.moveMade && !game.testingMode) {
          return res.status(400).json({ error: 'You must spin before making another move' });
        }
        if (game.board[moveDisk][moveRow][moveCol] === null) {
          game.board[moveDisk][moveRow][moveCol] = game.currentPlayer;
          game.moveMade = true;
        }
      } else if (action === 'spin') {
        if (!game.moveMade) {
          return res.status(400).json({ error: 'You must make a move before spinning' });
        }
        const newBoard = [];
        if (spinDirection === 'CW') {
          for (let i = 0; i < 3; i++) {
            newBoard[i] = [game.board[spinDisk][2][i], game.board[spinDisk][1][i], game.board[spinDisk][0][i]];
          }
        } else {
          for (let i = 0; i < 3; i++) {
            newBoard[i] = [game.board[spinDisk][0][2-i], game.board[spinDisk][1][2-i], game.board[spinDisk][2][2-i]];
          }
        }

        game.board[spinDisk] = newBoard;
        const winner = checkWin(game.board);
        if (winner) {
          game.winner = winner;
        }
        game.currentPlayer = game.currentPlayer === 'R' ? 'B' : 'R';
        game.moveMade = false;
      } else if (action === 'reset') {
        game = {
          board: [
            [
              [null, null, null],
              [null, null, null],
              [null, null, null],
            ],
            [
              [null, null, null],
              [null, null, null],
              [null, null, null],
            ],
            [
              [null, null, null],
              [null, null, null],
              [null, null, null],
            ],
            [
              [null, null, null],
              [null, null, null],
              [null, null, null],
            ],
        ],
        currentPlayer: 'R',
        winner: null,
        moveMade: false,
        testingMode: true,
      };
    }
    return res.json(game);
  }
}
function checkWin(board) {
    // Check horizontal wins
    for (let disk = 0; disk < 4; disk++) {
      for (let row = 0; row < 3; row++) {
        let count = 0;
        let player = null;
        for (let col = 0; col < 3; col++) {
          if (board[disk][row][col] !== null) {
            if (player === null || board[disk][row][col] === player) {
              player = board[disk][row][col];
              count++;
            } else {
              count = 0;
            }
          } else {
            count = 0;
          }
          if (count >= 5) {
            return player;
          }
          // Check adjacent disk
          if (col === 2 && disk % 2 === 0) {
            let nextDisk = disk + 1;
            let nextCol = 0;
            while (nextCol < 3 && board[nextDisk][row][nextCol] === player) {
              count++;
              nextCol++;
            }
            if (count >= 5) {
              return player;
            }
          }
        }
      }
    }
  
    // Check vertical wins
    for (let disk = 0; disk < 4; disk++) {
      for (let col = 0; col < 3; col++) {
        let count = 0;
        let player = null;
        for (let row = 0; row < 3; row++) {
          if (board[disk][row][col] !== null) {
            if (player === null || board[disk][row][col] === player) {
              player = board[disk][row][col];
              count++;
            } else {
              count = 0;
            }
          } else {
            count = 0;
          }
          if (count >= 5) {
            return player;
          }
          // Check adjacent disk
          if (row === 2 && disk < 2) {
            let nextDisk = disk + 2;
            let nextRow = 0;
            while (nextRow < 3 && board[nextDisk][nextRow][col] === player) {
              count++;
              nextRow++;
            }
            if (count >= 5) {
              return player;
            }
          }
        }
      }
    }
  
// Combine disks 0 and 1, and disks 2 and 3
let combinedDisks = [[], []];
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 3; j++) {
    combinedDisks[i].push([...board[i*2][j], ...board[i*2+1][j]]);
  }
}

// Combine the combined disks into a single 6x6 grid
let grid = [];
for (let i = 0; i < 6; i++) {
  grid.push([]);
  for (let j = 0; j < 6; j++) {
    if (i < 3) {
      grid[i].push(combinedDisks[0][i][j]);
    } else {
      grid[i].push(combinedDisks[1][i-3][j]);
    }
  }
}

// Combine the combined disks into a single 6x6 grid
// let grid = [];
// for (let i = 0; i < 6; i++) {
//   grid.push([...combinedDisks[0][i], ...combinedDisks[1][i]]);
// }

// Check diagonal wins
for (let row = 0; row < 6; row++) {
  for (let col = 0; col < 6; col++) {
    let count = 0;
    let player = null;
    let nextRow = row;
    let nextCol = col;
    while (nextRow < 6 && nextCol < 6) {
      if (grid[nextRow][nextCol] !== null) {
        if (player === null || grid[nextRow][nextCol] === player) {
          player = grid[nextRow][nextCol];
          count++;
        } else {
          break;
        }
      } else {
        break;
      }
      nextRow++;
      nextCol++;
    }
    if (count >= 5) {
      return player;
    }
  }
}

// Check anti-diagonal wins
for (let row = 0; row < 6; row++) {
  for (let col = 5; col >= 0; col--) {
    let count = 0;
    let player = null;
    let nextRow = row;
    let nextCol = col;
    while (nextRow < 6 && nextCol >= 0) {
      if (grid[nextRow][nextCol] !== null) {
        if (player === null || grid[nextRow][nextCol] === player) {
          player = grid[nextRow][nextCol];
          count++;
        } else {
          break;
        }
      } else {
        break;
      }
      nextRow++;
      nextCol--;
    }
    if (count >= 5) {
      return player;
    }
  }
}
    return null;
  }
  
  // Unit tests
  let board1 = [
    [ [ null, null, null ], [ null, null, null ], [ null, null, null ] ],
    [ [ null, null, null ], [ null, 'R', null ], [ 'R', null, null ] ],
    [ [ null, null, 'R' ], [ null, 'R', null ], [ 'R', null, null ] ],
    [ [ null, null, null ], [ null, null, null ], [ null, null, null ] ]
  ];
  
  let board2 = [
    [ [ null, null, null ], [ 'R', null, null ], [ null, 'R', null ] ],
    [ [ null, null, null ], [ null, null, null ], [ null, null, null ] ],
    [ [ null, null, 'R' ], [ null, null, null ], [ null, null, null ] ],
    [ [ null, null, null ], [ 'R', null, null ], [ null, 'R', null ] ]
  ];
