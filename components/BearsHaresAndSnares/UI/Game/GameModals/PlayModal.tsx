import { GameStateType } from "../SharedGameTypes/gameState";
import { PlayerViewType } from "../SharedGameTypes/playerTypes";
import Card from "../GameCards/Card";
import { CardType } from "../SharedGameTypes/CardType";
type Props = {
  gameState:    GameStateType;
  setGameState: (g: GameStateType | ((prev: GameStateType) => GameStateType)) => void;
  myView:       PlayerViewType;
};
export default function PlayModal({myView,gameState, setGameState}: Props){

    function handlePick(card:CardType){
        
    }

return (<>  
        <div className="modal-overlay">
          <div className="modal">
            <h2>Choose a card and pass the rest</h2>
            {/*We need to determine what to show. Are there cards with pre-effects?  if so show pre-effect activation. We need to show the action options. Then we need to show the cards for sacrafice or the cards in hand*/}
            {/* Below we need to render the list of cards in hand. If picked then we need to determine if we can play that card, what type of card it is, where it goes, and resolve its effects. */}
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



