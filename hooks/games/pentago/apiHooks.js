
export const useMakeMove = (mutate, setMoveMade) => {
  const makeMove = async (disk, row, col) => {
    const response = await fetch('/api/games/pentago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'move', moveDisk: disk, moveRow: row, moveCol: col }),
    });
    const data = await response.json();
    mutate();
    setMoveMade(true);
  };

  return makeMove;
};

export const useSpin = (mutate, setMoveMade) => {
  const spin = async (disk, direction) => {
    const response = await fetch('/api/games/pentago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'spin', spinDisk: disk, spinDirection: direction }),
    });
    const data = await response.json();
    mutate();
    setMoveMade(false);
  };

  return spin;
};

export const useReset = (mutate) => {
  const reset = async () => {
    const response = await fetch('/api/pentago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' }),
    });
    const data = await response.json();
    mutate();
  };

  return reset;
};