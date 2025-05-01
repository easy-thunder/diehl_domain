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
    gamePhase:"initiate" | "draw" | "discard" | "play" | "handleEndOfGame" ; 
    turnClock: number;
    numberOfRoundsInDrawAndPlayPhase: number;

  }