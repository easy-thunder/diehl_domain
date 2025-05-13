import { useEffect }         from "react";
import { CardType }          from "../SharedGameTypes/CardType";
import Card                  from "../GameCards/Card";
import { GameStateType }     from "../SharedGameTypes/gameState";
import { PlayerViewType }    from "../SharedGameTypes/playerTypes";

type Props = {
  gameState:    GameStateType;
  setGameState: (g: GameStateType) => void;
  myView:       PlayerViewType;
};

export default function CardSelectionModal({ gameState, setGameState, myView }: Props) {
  const me = gameState.players.find(p => p.peerId === gameState.thisPlayersPeerId);
  if (!me) return null;                     
  
  useEffect(() => {
    const allReady = gameState.players.every(p => p.playerIsReadyToPassCardsDuringDrawPhase);
    if (!allReady) return;

    
    const passedOnce = gameState.players.map((p, idx, arr) => {
      const nextIdx = (idx + 1) % arr.length;
      return {
        ...arr[nextIdx],
        cardsToSelectFrom: [
          ...arr[nextIdx].cardsToSelectFrom,
          ...p.cardsPassedFromAnotherPlayer,
        ],
      };
    });

    
    const cleanPlayers = passedOnce.map(p => ({
      ...p,
      cardsPassedFromAnotherPlayer: [],
      playerIsReadyToPassCardsDuringDrawPhase: false,
    }));

    
    const roundDone = cleanPlayers.every(p => p.cardsToSelectFrom.length === 0);

    setGameState({
      ...gameState,
      players: cleanPlayers,
      gamePhase: roundDone ? "discard" : gameState.gamePhase,
    });
  }, [gameState.players]);                

  
  function handlePick(card: CardType) {
    if(!me){return}
    const chosen    = { ...card, owner: me.peerId, isBeingSelected: true };
    const leftovers = me.cardsToSelectFrom.filter(c => c.id !== card.id);

    
    const updatedPlayers = gameState.players.map(p =>
      p.peerId === me.peerId
        ? {
            ...p,
            cardsToSelectFrom: [],
            cardsInHand: [...p.cardsInHand, chosen],
            playerIsReadyToPassCardsDuringDrawPhase: true,
            cardsPassedFromAnotherPlayer: leftovers,
          }
        : p
    );

    setGameState({ ...gameState, players: updatedPlayers });
  }

  
  const showModal = me.cardsToSelectFrom.length > 0;

  return showModal ? (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Choose a card and pass the rest</h2>

        <div className="card-list">
          {me.cardsToSelectFrom.map(c => (
            <Card
              key={c.id}
              card={c}
              gameState={gameState}
              size="large"
              onClick={() => handlePick(c)}
            />
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
