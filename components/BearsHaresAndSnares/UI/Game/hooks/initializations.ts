import { PlayerFromLobby, PlayerInGame } from "../SharedGameTypes/playerTypes"
import { GameStateType, } from "../SharedGameTypes/gameState"
type PlayerViewType = {
    player: PlayerInGame;
    top?: PlayerInGame;
    left?: PlayerInGame;
    right?: PlayerInGame;
  };
export     function addGameStatsToPlayer(player: PlayerFromLobby, initialPlayers:any): PlayerInGame {
    return {
        ...player,
        numberOfActions: 1,
        numberOfActionsTakenThisTurn:0,
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
        playerHasSelectedDeckAtStartOfGame: false

    }
}



export function getPlayerView(gameState: GameStateType, perspectivePeerId: string): PlayerViewType | null {
    let players = [...gameState.players]; // Clone to avoid modifying original
  
    const thisPlayerIndex = players.findIndex(p => p.peerId === perspectivePeerId);
    if (thisPlayerIndex === -1) return null;
  
    // 🧪 Add dummy players for solo testing
    if (players.length === 1) {
      const basePlayer = players[0];
  
      const makeDummy = (id: number): typeof basePlayer => ({
        ...basePlayer,
        peerId: `dummy-${id}`,
        name: `Tester ${id + 1}`,
        playing: true,
        host: false,
        id: `dummy-${id}`,
        cardsInHand: [],
        crittersInPlay: [],
        modsInPlay: [],
        numberOfActions: 1,
        numberOfCardsInHand: 0,
        maxNumberOfCardsAllowedInHand: 5,
        numberOfNegates: 2,
        maxNumberOfNegates: 3,
        numberOfCrittersInPlay: 0,
        maxNumberOfCrittersAllowedToPlay: Infinity,
        numberOfModsInPlay: 0,
        maxNumberOfModsAllowedToPlay: 5,
        canPlayBasicCards: true,
        canPlayMods: true,
        canUseCritterCardEffect: true,
        canUseModCardEffect: true,
        canChooseSacrafice: true,
        canChooseTarget: true,
        canPlayNegate: true,
        canBeNegated: true,
        playerTotalScore: 0,
        playerFieldScore: 0
      });
  
      // Add up to 3 dummy players
      players = [players[0], makeDummy(1), makeDummy(2), makeDummy(3)];
    }
  
    const rotated = [...players.slice(thisPlayerIndex), ...players.slice(0, thisPlayerIndex)];
  
    const view: PlayerViewType = {
      player: rotated[0],
      top: undefined,
      left: undefined,
      right: undefined,
    };
  
    if (players.length === 2) {
      view.top = rotated[1];
    } else if (players.length === 3) {
      view.left = rotated[1];
      view.top = rotated[2];
    } else if (players.length >= 4) {
      view.left = rotated[1];
      view.top = rotated[2];
      view.right = rotated[3];
    }
  
    return view;
  }

    export function chooseDeck(deckName: "firstDeck" | "secondDeck" | "thirdDeck", gameState:GameStateType, setGameState:React.Dispatch<React.SetStateAction<GameStateType>>) {

        if(!gameState) return;

        const thisPlayer = gameState.players.find(player => player.peerId === gameState.thisPlayersPeerId);
        if(thisPlayer?.playerChosenDeck !== "hasNotChosenDeck") return;
        const updatedPlayers = gameState.players.map(player =>
          player.peerId === gameState.thisPlayersPeerId
            ? { ...player, playerChosenDeck: deckName, playerHasSelectedDeckAtStartOfGame:true }
            : player
        );
      
        const updatedGameState = {
          ...gameState,
          players: updatedPlayers,
        };
        setGameState(()=>updatedGameState);
    }
  