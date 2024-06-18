
import {v4 as uuidv4} from 'uuid';

let gameStateArray = [];

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const gameId = req.query.gameId;
      if (gameId) {
        const gameState = gameStateArray.find((game) => game.gameId === gameId);
        if (gameState) {
          res.status(200).json(gameState);
        } else {
          res.status(200).json(undefined);
        }
      } else {
        res.status(200).json(gameStateArray);
      }
      break;
    case 'POST':
      const { column } = req.body;
      const playerId = req.headers['player-id'];
      const gameIdFromHeader = req.headers['game-id'];
      const gameState = gameStateArray.find((game) => game.gameId === gameIdFromHeader);
      if (!gameState) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      if (!gameState.players.includes(playerId)) {
        res.status(401).json({ error: 'You have not joined the game' });
        return;
      }
      if (gameState.winner) {
        res.status(400).json({ error: 'Game has already been won' });
        return;
      }
      if (gameState.players.indexOf(playerId) !== (gameState.currentPlayer === 'red' ? 0 : 1)) {
        res.status(400).json({ error: 'It is not your turn' });
        return;
      }
      
      // Find the lowest empty row in the column
      let row = 5;
      while (row >= 0 && gameState.board[row][column] !== null) {
        row--;
      }
      
      if (row < 0) {
        res.status(400).json({ error: 'Column is full' });
        return;
      }
      
      // Place the piece
      gameState.board[row][column] = gameState.currentPlayer;
      
      // Check for a win
      if (checkForWin(gameState.board, row, column, gameState.currentPlayer)) {
        gameState.winner = gameState.currentPlayer;
      }
      
      // Switch players
      gameState.currentPlayer = gameState.currentPlayer === 'red' ? 'black' : 'red';
      
      res.status(200).json(gameState);
    
      break;
    case 'PUT':
      const newPlayerId = req.body.playerId;
      let gameIdForNewPlayer = req.body.gameId;
      let gameStateForNewPlayer;
      console.log(gameStateArray)

      if (gameIdForNewPlayer) {
        gameStateForNewPlayer = gameStateArray.find((game) => game.gameId === gameIdForNewPlayer);
      } else {
        gameStateForNewPlayer = gameStateArray.find((game) => game.players.length < 2);
      }
      if (!gameStateForNewPlayer) {
        const newGameState = {
          gameId: uuidv4(),
          board: Array(6).fill(null).map(() => Array(7).fill(null)),
          currentPlayer: 'red',
          winner: null,
          players: [newPlayerId]
        };
        gameStateArray.push(newGameState);
        res.status(200).json(newGameState);
      } else {
        if (gameStateForNewPlayer.players.includes(newPlayerId)) {
          res.status(400).json({ error: 'You have already joined the game' });
          return;
        }
        if (gameStateForNewPlayer.players.length >= 2) {
          res.status(400).json({ error: 'The game is already full' });
          return;
        }
        gameStateForNewPlayer.players.push(newPlayerId);
        if (gameStateForNewPlayer.players.length === 1) {
          gameStateForNewPlayer.currentPlayer = 'red';
        } else {
          gameStateForNewPlayer.currentPlayer = 'black';
        }
        res.status(200).json(gameStateForNewPlayer);
      }



      case 'DELETE':
        const currentGameId = req.query.gameId;
        const playerLeft = req.query.playerLeft === 'true';
        if (currentGameId) {
          const index = gameStateArray.findIndex((game) => game.gameId === currentGameId);
          if (index !== -1) {
            if (playerLeft) {
              console.log('playerLeftDelete')
              gameStateArray.splice(index, 1);
              console.log(gameStateArray)
              res.status(200).json({ message: 'Game deleted' });
            } else {
              const gameStateToReset = gameStateArray[index];
              gameStateToReset.board = Array(6).fill(null).map(() => Array(7).fill(null));
              gameStateToReset.currentPlayer = 'red';
              gameStateToReset.winner = null;
              res.status(200).json({ message: 'Game reset' });
            }
          } else {
            res.status(404).json({ error: 'Game not found' });
          }
        } else {
          res.status(400).json({ error: 'Game ID is required' });
        }
        break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function checkForWin(board, row, col, player) {
  // Horizontal, vertical, and diagonal checks
  return checkDirection(board, row, col, player, 1, 0) || // Horizontal
         checkDirection(board, row, col, player, 0, 1) || // Vertical
         checkDirection(board, row, col, player, 1, 1) || // Diagonal /
         checkDirection(board, row, col, player, 1, -1);  // Diagonal \
}

function checkDirection(board, row, col, player, rowDir, colDir) {
  let count = 0;
  for (let i = -3; i <= 3; i++) {
    const r = row + i * rowDir;
    const c = col + i * colDir;
    if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === player) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }
  return false;
}