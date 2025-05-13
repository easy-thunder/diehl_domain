import { CardType } from "@/components/BearsHaresAndSnares/UI/Game/SharedGameTypes/CardType";
import { PlayerInGame } from "./playerTypes";

export interface GameStateType {
    gameDecks: {
      firstDeck: CardType[];
      secondDeck: CardType[];
      thirdDeck: CardType[];
    };
    players: PlayerInGame[];              
    thisPlayersPeerId: string;
    thisPlayersProfile: any;        
    currentPlayerTurn: Number;        
    gamePhase:"initiate" | "draw" | "select and pass cards" | "discard" | "play" | "handleEndOfGame" ; 
    turnClock: number;
    numberOfRoundsInDrawAndPlayPhase: number;//actually handled this differently for drawPhase
    roundNumber: number
    playerTurn: 0|1|2|3
  }

  