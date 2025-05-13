import { GameStateType } from "../SharedGameTypes/gameState";
import { PlayerViewType, PlayerInGame } from "../SharedGameTypes/playerTypes";
import Card from "../GameCards/Card";
import { CardType } from "../SharedGameTypes/CardType";

type Props = {
  gameState:    GameStateType;
  setGameState: (g: GameStateType | ((prev: GameStateType) => GameStateType)) => void;
  myView:       PlayerViewType;
};

export default function DiscardModal({myView, gameState, setGameState}:Props){

    console.log(myView, gameState,"This is in the discard phase")
    function handlePick(card: CardType) {
        if (!card) return;
      
        setGameState((prev: GameStateType) => {
          const updatedPlayers = prev.players.map((player: PlayerInGame) => {
            if (player.peerId !== prev.thisPlayersPeerId) return player;
      
            const newHand = player.cardsInHand.filter((c: CardType) => c.id !== card.id);
            return { ...player, cardsInHand: newHand };
          });
      
          return { ...prev, players: updatedPlayers };
        });
      }
      
    return(<>

        <div className="modal-overlay">
          <div className="modal">
            <h2>Choose a card and pass the rest</h2>
    
            <div className="card-list">
              {myView.player.cardsInHand.map(c => (
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

    </>)
}


