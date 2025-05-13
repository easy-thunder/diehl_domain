export type PlayerFromLobby = {
    host: boolean;
    id: string;
    name: string;
    peerId: string;
    playing: boolean;
    winPercent: number;
}

export interface PlayerInGame extends PlayerFromLobby {
    numberOfActions: number;
    numberOfActionsTakenThisTurn: number;
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
    playerTotalScore: number
    playerFieldScore: number;
    playerRitualScore: number;
    pointsToWin: number;
    currentPlayerTurn: boolean;
    drawsHowManyCards: number;
    playerChosenDeck: "hasNotChosenDeck" | "firstDeck" | "secondDeck" | "thirdDeck";
    playerIsReadyToPassCardsDuringDrawPhase: boolean;
    playerHasSelectedDeckAtStartOfGame: boolean;
    cardsToSelectFrom: any[];
    cardsPassedFromAnotherPlayer: any[];
    makesXnumberOfSelections: number;
    makesXNumberOfSelectionsForFirstCard: number;


}

export type PlayerViewType = {
    player: PlayerInGame; // your existing player type
    top?: PlayerInGame;
    left?: PlayerInGame;
    right?: PlayerInGame;
  };