// Three decks of cards, shuffled and dealt is how we need to start.
// We also need to pass in who is in the game.
// We need to hold the state of the cards in the game and make them all match. 
import Deck from "./GameCards/Deck"
import Midden from "./GameCards/Midden"
import { bearCards } from "./CardData/bearCards"
import { hareCards } from "./CardData/hareCards"
import { snareCards } from "./CardData/snareCards"
import { DataConnection } from "peerjs"
import { useState, useEffect, useMemo, RefObject } from "react"
import { PlayerFromLobby, PlayerInGame } from "./SharedGameTypes/playerTypes"
import { addGameStatsToPlayer, getPlayerView, chooseDeck } from "./hooks/initializations"
import { GameStateType } from "./SharedGameTypes/gameState"
import Peer from "peerjs"
import { drawCards } from "./hooks/drawCards"
import CardSelectionModal from "../Game/GameModals/cardSelectionModal"

type GameProps ={
    connections: DataConnection[],
    peerId: string,
    thisUserProfile: any,
    players: PlayerFromLobby[],
    peer: RefObject<Peer | null>; 
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
export default function Game({connections, peerId, thisUserProfile,players,peer}:GameProps){

    const initialPlayers: PlayerInGame[] = players.map(player=>addGameStatsToPlayer(player, players));
    const [isRemoteUpdate, setIsRemoteUpdate] = useState(false);
    const [gameState, setGameState] = useState<GameStateType>({
        gameDecks: {
            firstDeck: bearCards,
            secondDeck: hareCards,
            thirdDeck: snareCards
        },
        players: initialPlayers,
        thisPlayersPeerId: peerId,
        thisPlayersProfile: thisUserProfile,
        currentPlayerTurn: 0,
        gamePhase: "initiate",
        turnClock:30000,//milliseconds before action is skipped
        numberOfRoundsInDrawAndPlayPhase: initialPlayers.length,
    })
    

    // This effect sets up the PeerJS connection and listens for incoming gameState connections.
    useEffect(() => {
        if (!peer?.current) return;
      
        const handleData = (conn: DataConnection) => {
          const onData = (data: any) => {
            console.log("📥 [Peer.on] Data received from", conn.peer, data);
      
            if (data.type === "gameStateUpdate") {
              console.log("✅ Received game state update:", data.gameState);
              setIsRemoteUpdate(true);
              setGameState((prevState) => ({
                ...prevState,
                gameDecks: data.gameState.gameDecks,
                players: data.gameState.players,
                currentPlayerTurn: data.gameState.currentPlayerTurn,
                gamePhase: data.gameState.gamePhase,
                numberOfRoundsInDrawAndPlayPhase: data.gameState.numberOfRoundsInDrawAndPlayPhase,
              }));
            }
          };
      
          conn.on("data", onData);
          conn.on("close", () => console.log("❌ Connection closed:", conn.peer));
        };
      
        // 🔁 Listen to future connections
        peer.current.on("connection", handleData);
      
        // 🔁 Attach to already-open connections
        Object.values(peer.current.connections).forEach((connArray) => {
          connArray.forEach((conn:any) => {
            handleData(conn); // ⬅️ this is key
          });
        });
      
        return () => {
          peer.current?.off("connection", handleData);
        };
      }, [peer]);
      

    // We have handled players being able to connect. We have set up where gameState changes are sent to all players. We have handled local views of the game state. The decks are shuffled.
    // Now we need to handle every player gettin the number of cards the need to draw. We need to handle every player drawing a card. We need to handle the initiate phase and the end of the initiate phase.
    // 1. check if all players have chosen a deck.
    // 2. once all players have chosen a deck give each player one card from their chosen deck.Change initiate phase to draw phase.
  
  
  

      // This effect initiates the game and broadcasts any game state changes to all connections.
    useEffect(() => {
        console.log("Game state updated:", gameState);
        if (isRemoteUpdate) {
          setIsRemoteUpdate(false);
          return;
        }
        console.log("got past remot update check")

      
        // ✅ Use the connections prop, NOT gameState.connections
        connections.forEach((conn) => {
          if (conn.open) {
            const serializableGameState = {
                ...gameState,
                // ⛔️ REMOVE unsafe fields before sending
                thisPlayersProfile: undefined, // if it includes functions/refs
              };
              console.log("Sending game state to connection:", serializableGameState);
              conn.send({
                type: "gameStateUpdate",
                gameState: serializableGameState,
                playerId: gameState.thisPlayersPeerId,
              });
          }
        });
      
        // ✅ Handle initiate phase
        if (gameState.gamePhase !== "initiate") return;
      
        const allPlayersHaveChosenDeck = gameState.players.every(
          (player) => player.playerHasSelectedDeckAtStartOfGame
        );
      
        if (allPlayersHaveChosenDeck) {
          const updatedDecks = { ...gameState.gameDecks };
      
          const updatedPlayers = gameState.players.map((player) => {
            const chosenDeckName = player.playerChosenDeck as keyof typeof updatedDecks; // ✅ safer typing
            const deck = updatedDecks[chosenDeckName];
      
            if (!deck || deck.length === 0) {
              console.warn(`Deck ${chosenDeckName} is empty or invalid`);
              return player;
            }
      
            const drawnCard = { ...deck[0], owner: player.peerId };
            updatedDecks[chosenDeckName] = deck.slice(1);
      
            return {
              ...player,
              cardsInHand: [...player.cardsInHand, drawnCard],
            };
          });
      
          const updatedGameState = {
            ...gameState,
            players: updatedPlayers,
            gameDecks: updatedDecks,
            gamePhase: "draw" as const,
          };
          setGameState(() => updatedGameState);
        }
      }, [gameState, connections]);

    // This effect handles the game phase changes and player turns.
    useEffect(() => {
        if (gameState.gamePhase === "draw") {
            drawCards(gameState, setGameState);
        }
        if( gameState.gamePhase === "select and pass cards") {
            // This is where we need to handle the player selecting a card and passing the rest to the left.

        }
            
        if (gameState.gamePhase === "discard") {
        }
        if (gameState.gamePhase === "play") {
        }
        if (gameState.gamePhase === "handleEndOfGame") {
        }

    }, [gameState]);
      
    // first time using useMemo. Basically I only want to run this function when the gameState or peerId changes.
    const myView = useMemo(() => getPlayerView(gameState, peerId), [gameState.players, peerId]);
    if (!myView) return <div>Error: player view not found</div>;




    return(
        <div className='invisible-game-grid'>
            {gameState.gamePhase === "select and pass cards" && (
                <CardSelectionModal myView={myView} cards={myView.player.cardsToSelectFrom} setGameState={setGameState} gameState={gameState}/>
            )}
            <div className="zone deck-container">
                <Deck   deckCards={gameState.gameDecks.firstDeck} cardClass="bear" onClick={() => chooseDeck("firstDeck", gameState, setGameState)} />
                <Midden cardClass="bear"/>
                <Deck deckCards={gameState.gameDecks.secondDeck} onClick={() => chooseDeck("secondDeck", gameState, setGameState)} cardClass="hare"/>
                <Midden cardClass="hare"/>
                <Deck deckCards={gameState.gameDecks.thirdDeck} onClick={() => chooseDeck("thirdDeck", gameState, setGameState)} cardClass="snare"/>
                <Midden cardClass="snare"/>
            </div>
            {myView.top && (
      <div className="zone top-hand">
        {myView.top.name} – Cards: {myView.top.cardsInHand.length}
      </div>
    )}
    {myView.left && (
      <div className="zone left-hand">
        {myView.left.name} – Cards: {myView.left.cardsInHand.length}
      </div>
    )}
    {myView.right && (
      <div className="zone right-hand">
        {myView.right.name} – Cards: {myView.right.cardsInHand.length}
      </div>
    )}
    <div className="zone player-hand">
      {myView.player.name} – Your Cards: {myView.player.cardsInHand.length}
    </div>
            <div className="zone top-field">Top Field</div>
            <div className="zone player-field">Player Field</div>
            <div className="zone left-field">Left Field</div>
            <div className="zone right-field">Right Field</div>
        </div>

    )
}



