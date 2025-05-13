import { GameStateType } from "../SharedGameTypes/gameState";


export function handleDeckSelectionPhase(gameState: GameStateType, setGameState: (g: GameStateType) => void, setInstruction?: (text: string) => void) {
    const allPlayersHaveChosenDeck = gameState.players.every(
      (player) => player.playerHasSelectedDeckAtStartOfGame
    );
  
    if (!allPlayersHaveChosenDeck) {
      setInstruction?.("Waiting for all players to choose a deck");
      return;
    }
  
    const updatedDecks = { ...gameState.gameDecks };
  
    const updatedPlayers = gameState.players.map((player) => {
      const chosenDeckName = player.playerChosenDeck as keyof typeof updatedDecks;
      const deck = updatedDecks[chosenDeckName];
  
      if (!deck || deck.length === 0) {
        console.warn(`Deck ${chosenDeckName} is empty or invalid`);
        return player;
      }
  
      const drawnCard = { ...deck[0], owner: player.peerId };
      updatedDecks[chosenDeckName] = deck.slice(1);
  
      return {
        ...player,
        cardsInHand: [...player.cardsInHand, drawnCard],
      };
    });
  
    const updatedGameState = {
      ...gameState,
      players: updatedPlayers,
      gameDecks: updatedDecks,
      gamePhase: "draw" as const,
    };
  
    setGameState(updatedGameState);
  }
  