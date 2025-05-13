import { CardType } from "../SharedGameTypes/CardType";
import { GameStateType } from "../SharedGameTypes/gameState";

type CardProps = {
  card: CardType;
  gameState: GameStateType;
  onClick?: () => void;
  size?: "small" | "large";
};

export default function Card({ gameState, card, onClick, size = "small" }: CardProps) {
  const faceUp =
    card.isBeingSelected ||
    card.faceUpForEveryone ||
    card.owner === gameState.thisPlayersPeerId;

  const cardColorClass = card.type === "hare"
    ? "card-hare"
    : card.type === "bear"
    ? "card-bear"
    : "card-snare";

  return (
    <div
      className={`BHS_card ${size === "large" ? "card-large" : "card-small"} ${faceUp ? `card-face-front ${cardColorClass}` : `BHS_back-of-card-${card.cardClass}`}`}
      onClick={onClick}
    >
      {faceUp && size === "large" ? (
        <>
          <div className="card-header">
            <div className="card-clan">{card.clan}</div>
            <div className="card-name">{card.name}</div>
          </div>
          <div className="card-image-placeholder">Image goes here</div>
          <div className="card-description-box">
            <p className="card-description">{card.description}</p>
          </div>
          <div className="card-type">{card.type}</div>
        </>
      ) : faceUp ? (
        <p className="card-name">{card.name}</p>
      ) : (
        <div className={`BHS_back-of-card-${card.cardClass}`}></div>
      )}
    </div>
  );
}
