import useSWR from 'swr';
import styles from './pentago.module.css';
import { useMakeMove, useSpin, useReset } from '@/hooks/games/pentago/apiHooks';
import { useMouseDown } from '@/hooks/games/pentago/frontEndHooks';
import { useState, useRef } from 'react';
import fetcher from '@/lib/fetcher';

const Pentago = () => {
  const { data, error, mutate } = useSWR('/api/games/pentago', fetcher,  { refreshInterval: 1000,});
  const [moveMade, setMoveMade] = useState(false);
  const [testingMode, setTestingMode] = useState(false);
  const diskRefs = useRef([]);
  const rotationRefs = useRef([0, 0, 0, 0]);
  const makeMove = useMakeMove(mutate, setMoveMade);
  const spin = useSpin(mutate, setMoveMade);
  const reset = useReset(mutate);
  const handleMouseDown = useMouseDown(diskRefs, rotationRefs, spin);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const { board: board, currentPlayer, winner } = data;

  const handleMove = async (disk, row, col) => {
    if (!testingMode && moveMade) return;
    makeMove(disk, row, col);
  };

  const handleReset = async () => {
    reset();
  };
  return (
    <div className={styles.container}>
      <div className={styles.diskRow}>
        <div
          className={styles.disk}
          ref={(ref) => (diskRefs.current[0] = ref)}
          onMouseDown={(e) => handleMouseDown(e, 0)}
        >
          {board[0].map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => (
                <div key={colIndex} className={styles.cell}>
                  {cell === 'R' && <div className={styles.red} />}
                  {cell === 'B' && <div className={styles.blue} />}
                  {cell === null && (
                    <button
                      onClick={() => handleMove(0, rowIndex, colIndex)}
                      className={styles.button}
                      disabled={!testingMode && moveMade}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          className={styles.disk}
          ref={(ref) => (diskRefs.current[1] = ref)}
          onMouseDown={(e) => handleMouseDown(e, 1)}
        >
          {board[1].map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => (
                <div key={colIndex} className={styles.cell}>
                  {cell === 'R' && <div className={styles.red} />}
                  {cell === 'B' && <div className={styles.blue} />}
                  {cell === null && (
                    <button
                      onClick={() => handleMove(1, rowIndex, colIndex)}
                      className={styles.button}
                      disabled={!testingMode && moveMade}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.diskRow}>
        <div
          className={styles.disk}
          ref={(ref) => (diskRefs.current[2] = ref)}
          onMouseDown={(e) => handleMouseDown(e, 2)}
        >
          {board[2].map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => (
                <div key={colIndex} className={styles.cell}>
                  {cell === 'R' && <div className={styles.red} />}
                  {cell === 'B' && <div className={styles.blue} />}
                  {cell === null && (
                    <button
                      onClick={() => handleMove(2, rowIndex, colIndex)}
                      className={styles.button}
                      disabled={!testingMode && moveMade}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          className={styles.disk}
          ref={(ref) => (diskRefs.current[3] = ref)}
          onMouseDown={(e) => handleMouseDown(e, 3)}
        >
          {board[3].map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => (
                <div key={colIndex} className={styles.cell}>
                  {cell === 'R' && <div className={styles.red} />}
                  {cell === 'B' && <div className={styles.blue} />}
                  {cell === null && (
                    <button
                      onClick={() => handleMove(3, rowIndex, colIndex)}
                      className={styles.button}
                      disabled={!testingMode && moveMade}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleReset}>Reset Board</button>
      {winner && <div>Winner: {winner}</div>}
      <p>
        {data.currentPlayer === 'R' ? 'Red' : 'Blue'}'s turn -{' '}
        {moveMade ? 'Spin phase' : 'Move phase'}
      </p>
    </div>
  );
};

export default Pentago;