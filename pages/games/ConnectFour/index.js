// pages/games/ConnectFour/index.js'
//remember this save
// pages/games/ConnectFour/index.js
import useSWR, { mutate } from 'swr';
import styles from './connectFour.module.css';
import { useState, useEffect, useRef } from 'react';
import { useJoinGame, useColumnClick, useResetGame } from '../../../hooks/games/connectFourHooks';
import DarkButton from '@/components/utility/button/darkButton';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ConnectFour() {
  const [playerId, setPlayerId] = useState(null);
  const [playerColor, setPlayerColor] = useState('');
  const gameIdRef = useRef(null);
  const [message, setMessage] = useState('');
  const [joinMessage, setJoinMessage] = useState('');
  const [board, setBoard] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const { data, error } = useSWR(gameIdRef.current ? `/api/games/connectFour?gameId=${gameIdRef.current}` : null, fetcher, {
    refreshInterval: 1000,
  });

  const joinGame = useJoinGame(gameIdRef, setPlayerId, setPlayerColor, setJoinMessage, setBoard);
  const handleColumnClick = useColumnClick(playerId, gameIdRef.current, playerColor, setBoard, currentPlayer);
  const resetGame = useResetGame(gameIdRef.current, mutate);

  useEffect(() => {
    if (data && data.players.length === 0) {
      setMessage('The other player has left the game.');
      setPlayerId(null); // Reset the playerId state
    }
    if (data) {
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const handleBeforeUnload = async () => {
    await fetch('/api/games/connectFour?playerLeft=true&gameId=' + gameIdRef.current, {
      method: 'DELETE',
    });
  };
  if (error && gameIdRef.current) {
    return (
      <div>
        <p>The other player left.</p>
        <div style={{height:"15%",width:"15%"}}>
          <DarkButton clicking={joinGame} content={'Join'} />
        </div>
        <div style={{height:"15%",width:"15%"}}>
      <Link href={'/'}>
        <DarkButton content={"HOME"} />
      </Link>
      </div>


      </div>
    );
  }
  if (error) return <div>Failed to load</div>;
  if (!data) return       <>
  <div style={{height:"15%",width:"15%"}}>

  <DarkButton clicking={joinGame} content={'Join'} />
  </div>


  <div style={{height:"15%",width:"15%"}}>
      <Link href={'/'}>
        <DarkButton content={"HOME"} />
      </Link>
      </div>
  </>


  const { winner } = data;

  return (
    <div className={styles.container}>
      <h1>Connect Four</h1>
      {winner ? <h2>{winner} wins!</h2> : <h2>Current Player: {currentPlayer}</h2>}
      {playerId ? (
      <p>{joinMessage}</p>
    ) : (
      // <button onClick={joinGame}>Join Game</button>
      <>
      <div style={{height:"15%",width:"15%"}}>

      <DarkButton clicking={joinGame} content={'Join'} />
      </div>

      
      </>
      
    )}
      <p>{message}</p>
      <p>Player Color: {playerColor}</p>
      <div style={{height:"15%",width:"15%"}}>

        <DarkButton clicking={resetGame} content={'Reset'} />
      </div>

      <div className={styles.board}>
        {board? board.map((row, rowIndex) => (


          <div key={rowIndex} className={styles.row}>
            {row? row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={styles.cell}
                onClick={() => handleColumnClick(colIndex)}
              >
                <div className={`${styles.piece} ${styles[cell]}`}></div>
              </div>



            )):null}
            
          </div>
        )):null}
      </div>
      <div style={{height:"15%",width:"15%"}}>
      <Link href={'/'}>
        <DarkButton content={"HOME"} />
      </Link>
      </div>
      
      
    </div>
  );
}