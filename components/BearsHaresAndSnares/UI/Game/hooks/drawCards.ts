
import { GameStateType } from "../SharedGameTypes/gameState";

export function drawCards(gameState:GameStateType, setGameState:(gameState:GameStateType)=>void) {
    const { gameDecks } = gameState;

    // We need to select the first player. Then we need to draw all the cards for that player. Then we send the gameState to the other players. Then loop back through to the next player.
    const players = gameState.players;
    const hostPlayer = players.find(player=> player.host)
    if(!hostPlayer) return;// only want to do this at the host player and send one time to all players

    
let updatedDecks = { ...gameDecks };
let updatedPlayers = players.map((player) => {
  if (player.playerChosenDeck === "hasNotChosenDeck") return player;

  const deck = updatedDecks[player.playerChosenDeck];
  const drawnCards = deck.slice(0, player.drawsHowManyCards);
  updatedDecks[player.playerChosenDeck] = deck.slice(player.drawsHowManyCards);
  drawnCards.forEach(card=> card.isBeingSelected=true)
  return {
    ...player,
    cardsToSelectFrom: [...player.cardsToSelectFrom, ...drawnCards],
  };
});

const newGameState = {
  ...gameState,
  gameDecks: updatedDecks,
  players: updatedPlayers,
  gamePhase: "select and pass cards", 
} as GameStateType;

setGameState(newGameState);

}


