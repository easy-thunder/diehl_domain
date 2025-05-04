import { CardType } from "../SharedGameTypes/CardType";
import Card from "../GameCards/Card";
import { GameStateType } from "../SharedGameTypes/gameState";
import { PlayerViewType } from "../SharedGameTypes/playerTypes";

type CardSelectionModalProps = {
  cards: CardType[];
  gameState: GameStateType;
  setGameState: (gameState:GameStateType)=>void;
  myView: PlayerViewType;
};

export default function CardSelectionModal({ myView,gameState, cards, setGameState }: CardSelectionModalProps) {
    // update the selector and isBeingSelected
    function handleCardSelection(card: CardType) {
        // 1. Update the selected card's owner and isBeingSelected
        const updatedCard = { ...card, owner: gameState.thisPlayersPeerId, isBeingSelected: true };
      
        // 2. Remove it from cardsToSelectFrom
        const updatedPlayers = gameState.players.map((p) => {
          if (p.peerId === gameState.thisPlayersPeerId) {
            return {
              ...p,
              cardsToSelectFrom: p.cardsToSelectFrom.filter(c => c.id !== card.id),
              cardsInHand: [...p.cardsInHand, updatedCard],
            };
          }
          return p;
        });
      
        // 3. Pass remaining cards to left player
        const leftPeerId = myView.left?.peerId;
        const leftPlayerIndex = gameState.players.findIndex(p => p.peerId === leftPeerId);
        const thisPlayer = gameState.players.find(p => p.peerId === gameState.thisPlayersPeerId);
        const cardsToPass = thisPlayer?.cardsToSelectFrom.filter(c => c.id !== card.id) || [];
      
        if (leftPlayerIndex !== -1) {
          updatedPlayers[leftPlayerIndex] = {
            ...gameState.players[leftPlayerIndex],
            cardsToSelectFrom: [
              ...(gameState.players[leftPlayerIndex].cardsToSelectFrom || []),
              ...cardsToPass,
            ],
          };
        }
      
        setGameState({
          ...gameState,
          players: updatedPlayers,
        });
      }
      
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Choose cards</h2>
        <div className="card-list">
          {cards.map((card) => <Card gameState={gameState} card={card} onClick={() => handleCardSelection(card)}
          />)}
        </div>
      </div>
    </div>
  );
}