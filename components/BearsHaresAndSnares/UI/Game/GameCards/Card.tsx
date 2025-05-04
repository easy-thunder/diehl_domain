import games from "@/pages/games";
import { CardType } from "../SharedGameTypes/CardType";
import { GameStateType } from "../SharedGameTypes/gameState";

type CardProps = {
    // setGameState: (gameState: GameStateType) => void;
    card: CardType;
    gameState: GameStateType;
    onClick?: () => void;

};

export default function Card({ gameState, card, onClick }: CardProps) {
    console.log('in Card.tsx',card)
    const faceUp = card.isBeingSelected || card.faceUpForEveryone || card.owner === gameState.thisPlayersPeerId
    // is card faceup for the player? 
    // is the card faceup for other players?
    // should we handle the card faceup or face down in the card itself or include a separate state for it?
    // if we manage outside the card, we can pass faceUp as a prop
    ////////////////////////////////////
    //JAKE This is where we are at. I think it would be better to resolve the function of the click handling outside of the card
    //BECAUSE clicking on selection will have a different effect than clicking to play. so pass in a handler
    ////////////////////////////////////

  return (

    <div
      className={`BHS_card ${faceUp ? "card-face-front" : `BHS_back-of-card-${card.cardClass}`}`}
      onClick={onClick}
    >
      {faceUp ? (
        <>
          <h3 className="card-name">{card.name}</h3>
          <p className="card-type">{card.type}</p>
          <p className="card-description">{card.description}</p>
          <ul className="card-effects">
            {card.effects.map((effect, idx) => (
              <li key={idx}>{effect}</li>
            ))}
          </ul>
        </>
      ) : (
        <div className={`BHS_back-of-card-${card.cardClass}`}></div> 
      )}
    </div>
  );
}
