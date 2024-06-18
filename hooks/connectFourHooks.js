// pages/games/ConnectFour/hooks.js
import { v4 as uuidv4 } from 'uuid';

export const useJoinGame = (gameIdRef, setPlayerId, setPlayerColor, setJoinMessage, setBoard) => {
  return async () => {
    const newPlayerId = uuidv4();
    setPlayerId(newPlayerId);
    const response = await fetch('/api/games/connectFour', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerId: newPlayerId }),
    });
    const data = await response.json();
    gameIdRef.current = data.gameId;
    if (data.players.length === 1) {
      setPlayerColor('red');
    } else {
      setPlayerColor('black');
    }
    setJoinMessage(`You have successfully joined the game as ${data.players.length === 1 ? 'red' : 'black'}`);
    setBoard(data.board);
  };
};

export const useColumnClick = (playerId, gameId, playerColor, setBoard, currentPlayer) => {
  return async (column) => {
    if (currentPlayer !== playerColor) return;
    const response = await fetch('/api/games/connectFour', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Player-Id': playerId,
        'Game-Id': gameId,
      },
      body: JSON.stringify({ column }),
    });
    const data = await response.json();
    setBoard(data.board);
  };
};

export const useResetGame = (gameId, mutate) => {
  return async () => {
    await fetch('/api/games/connectFour?playerLeft=false&gameId=' + gameId, {
      method: 'DELETE',
    });
    mutate('/api/games/connectFour?gameId=' + gameId);
  };
};