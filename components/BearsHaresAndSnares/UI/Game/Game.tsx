// Three decks of cards, shuffled and dealt is how we need to start.
// We also need to pass in who is in the game.
// We need to hold the state of the cards in the game and make them all match. 
import Deck from "./GameCards/Deck"
import Midden from "./GameCards/Midden"
import { bearCards } from "./CardData/bearCards"
import { hareCards } from "./CardData/hareCards"
import { snareCards } from "./CardData/snareCards"
import { DataConnection } from "peerjs"
import { useState } from "react"
import { CardType } from "@/components/BearsHaresAndSnares/UI/Game/SharedGameTypes/CardType"
type GameProps ={
    connections: DataConnection[],
    peerId: string,
    thisUserProfile: any,
    players: PlayerFromLobby[]
}
type PlayerFromLobby = {
    host: boolean;
    id: string;
    name: string;
    peerId: string;
    playing:boolean;
    winPercent: number;
}
interface PlayerInGame extends PlayerFromLobby {
    numberOfActions: number;
    numberOfCardsInHand: number;
    maxNumberOfCardsAllowedInHand: number;
    cardsInHand: any[];
    numberOfNegates: number;
    maxNumberOfNegates: number;
    numberOfCrittersInPlay: number;
    maxNumberOfCrittersAllowedToPlay: number;
    numberOfModsInPlay: number;
    maxNumberOfModsAllowedToPlay: number;
    canPlayBasicCards: boolean;
    canPlayMods: boolean;
    crittersInPlay: any[];
    modsInPlay: any[];
    canUseCritterCardEffect: boolean;
    canUseModCardEffect: boolean;
    canChooseSacrafice: boolean;
    canChooseTarget: boolean;
    canPlayNegate: boolean;
    canBeNegated: boolean;
    playerTotalScore:number
    playerFieldScore:number;
    playerRitualScore:number;
    pointsToWin:number;
    currentPlayerTurn: boolean;
    drawsHowManyCards: number;
    playerChosenDeck: "hasNotChosenDeck" | "bear" | "hare" | "snare";
    playerIsReadyToPassCardsDuringDrawPhase: boolean;

}
interface GameState {
    connections: DataConnection[];
    gameDecks: {
      firstDeck: CardType[];
      secondDeck: CardType[];
      thirdDeck: CardType[];
    };
    players: PlayerInGame[];              
    thisPlayersPeerId: string;
    thisPlayersProfile: any;        
    currentPlayerTurn: Number;        
    gamePhase:"initiate" | "starter card" | "draw" | "discard" | "play" | "handleEndOfGame" ; 
    turnClock: number;
    numberOfRoundsPerDrawPhase: number;

  }
// 1. Ensure all players are connectected. Get all the player info on the table. Deterimne first player. Shuffle decks. initiate Phase Phase never happens again
// 2. All players choose a card from which deck they want to add to their hands. Once all players have chosen cards are drawn in player order. starter card phase phase never happens again
// 3. Draw phase happens. Each player draws a number of cards equal to the number of players from the deck they chose originally. They choose a card and pass the rest to the left. This continues until all cards are gone. "draw phase"
// 3A. Methods: Player has selected. All players have selected. Pass cards to the left. All cards are gone initiate discard phase. 
// 4. Should a player have more than five cards in their hand they must discard down to five. happens syncronously and phase ends when everyone has decided "discard phase"
// 5. Play phase happens. Player one starts and plays a critter or a mod. When played players have 5 seconds to decide if they want to negate or not. If not negated effect occurs and next players turn happens. This  continues until all players have played the number of cards that were drawn in the draw phase.
// 5A. Player may choose to draw another card instead
// 5B. Player may sacrafice two creatures to get a negate
// 5c. Player may sacrafice three creatures for a permanent point
// Repeat steps 3 and 5 until one player has set number of points.
export default function Game({connections, peerId, thisUserProfile,players}:GameProps){
    console.log("connections passedIn",connections)
    function addGameStatsToPlayer(player: PlayerFromLobby): PlayerInGame {
        return {
            ...player,
            numberOfActions: 1,
            numberOfCardsInHand:0,
            maxNumberOfCardsAllowedInHand: 5,
            cardsInHand:[],
            numberOfNegates: 2,
            maxNumberOfNegates: 3,
            numberOfCrittersInPlay:0,
            maxNumberOfCrittersAllowedToPlay: 100,
            numberOfModsInPlay:0,
            maxNumberOfModsAllowedToPlay: 5,
            canPlayBasicCards: true,
            canPlayMods: true,
            crittersInPlay: [],
            modsInPlay: [],
            canUseCritterCardEffect: true,
            canUseModCardEffect: true,
            canChooseSacrafice: true,
            canChooseTarget: true,
            canPlayNegate: true,
            canBeNegated: true,
            playerTotalScore: 0,
            playerFieldScore: 0,
            playerRitualScore: 0,
            pointsToWin: 10,
            currentPlayerTurn: false,
            drawsHowManyCards: initialPlayers.length,
            playerChosenDeck: "hasNotChosenDeck",
            playerIsReadyToPassCardsDuringDrawPhase: false,
            
        }
    }
    const initialPlayers: PlayerInGame[] = players.map(addGameStatsToPlayer);

    const [gameState, setGameState] = useState<GameState>({
        connections: connections,
        gameDecks: {
            firstDeck: bearCards,
            secondDeck: hareCards,
            thirdDeck: snareCards
        },
        players: initialPlayers,
        thisPlayersPeerId: peerId,
        thisPlayersProfile: thisUserProfile,
        currentPlayerTurn: 0,
        gamePhase: "draw",
        turnClock:30000,//milliseconds
        numberOfRoundsPerDrawPhase: initialPlayers.length,



    })
    console.log("gameState jake",gameState.players)
    return(
        <div className='invisible-game-grid'>
            <div className="zone deck-container">
                <Deck deckCards={bearCards} cardClass="bear"/>
                <Midden cardClass="bear"/>
                <Deck deckCards={hareCards} cardClass="hare"/>
                <Midden cardClass="hare"/>
                <Deck deckCards={snareCards} cardClass="snare"/>
                <Midden cardClass="snare"/>
            </div>
            <div className="zone left-hand">Left Hand</div>
            <div className="zone right-hand">Right Hand</div>
            <div className="zone top-hand">Top Hand</div>
            <div className="zone player-hand">Player Hand</div>
            <div className="zone top-field">Top Field</div>
            <div className="zone player-field">Player Field</div>
            <div className="zone left-field">Left Field</div>
            <div className="zone right-field">Right Field</div>
        </div>

    )
}



