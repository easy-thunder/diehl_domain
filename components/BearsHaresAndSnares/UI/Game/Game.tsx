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
import { shuffle } from "./hooks/shuffle"
import { handleDeckSelectionPhase } from "./hooks/handleDeckSelectionPhase"
import DiscardModal from "./GameModals/DiscardModal"
import PlayModal from "./GameModals/PlayModal"

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
        turnClock:30000,//milliseconds before action is skipped need to make option for gameSetup
        numberOfRoundsInDrawAndPlayPhase: initialPlayers.length,
        roundNumber:0,
        playerTurn:0,
    })
    const [instruction, setInstruction]= useState("Choose a deck to draw from.") 
    

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
            handleData(conn); 
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

        const shuffledDecks = Object.fromEntries(
            Object.entries(gameState.gameDecks).map(([deckName, deckCards]) => {
              return [deckName, shuffle(deckCards)];
            })
          ) 

          setGameState(prevState => ({
            ...prevState,
            gameDecks: {
              firstDeck: shuffledDecks.firstDeck || [],
              secondDeck: shuffledDecks.secondDeck || [],
              thirdDeck: shuffledDecks.thirdDeck || []
            }
          }));
          handleDeckSelectionPhase(gameState, setGameState, setInstruction);

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
            setInstruction(()=>"Players with over their card hand limit need to discard")
            const allPlayersWithinLimit = gameState.players.every(
              player => player.cardsInHand.length <= player.maxNumberOfCardsAllowedInHand
            );
          
            if (allPlayersWithinLimit) {
              setGameState(prev => ({ ...prev, gamePhase: "play" }));
            }
        }
        if (gameState.gamePhase === "play") {
            // preAction:
            // Activate inPlayCardEffectOptions
            //actions:
            // 1. play a card
            // 2. choose new deck and draw
            // 3. Check if can sacrafice 2, sacrafice 2 creatures to regenerate a negate
            // 4. Check if can sacrafice3, sacrafice 3 creatures to regnerate a negate and gain one permanent point

            //Note some cards effects need to be removed when the card is removed from play.
            setInstruction(()=>`We are now in a play phase. The number of rouds is ${gameState.numberOfRoundsInDrawAndPlayPhase} we are in round ${gameState.roundNumber}`)
            if(gameState.numberOfRoundsInDrawAndPlayPhase===gameState.roundNumber){
                console.log('here we need to re-select a deck then go to draw phase or we could simplify and just draw from that deck and leave cards in to change which deck you draw from or make it an action that can be taken.')
                return 
            }
            // figure out who is first. The first player in the array is first. but not necesarily
            // figure out how to display who's turn it is
            // figure out how to resolve card effects
            // figure out how to update the state of the field and update the players points
            // figure out how to pass to the next turn
            // figure out how to check if player has reached score that wins
            // figure out how to loop back through once all players have gone
            const playerThatIsPlaying = gameState.players[gameState.currentPlayerTurn as number]


            
            
        }
        if (gameState.gamePhase === "handleEndOfGame") {

        }

    }, [gameState]);
      
    const myView = useMemo(() => getPlayerView(gameState, peerId), [gameState.players, peerId]);
    console.log(myView?.player.cardsInHand)
    if (!myView) return <div>Error: player view not found</div>;



    

    return(
        <div className='invisible-game-grid'>
            {gameState.gamePhase === "select and pass cards" && (
                <CardSelectionModal myView={myView} setGameState={setGameState} gameState={gameState}/>
            )}
            {gameState.gamePhase==='discard' && myView.player.cardsInHand.length > myView.player.maxNumberOfCardsAllowedInHand && (
                <DiscardModal myView={myView} setGameState={setGameState} gameState={gameState}/>
            )}

            {gameState.gamePhase==="play" && gameState.thisPlayersPeerId=== gameState.players[gameState.playerTurn].peerId &&(
                <PlayModal myView={myView} gameState={gameState} setGameState={setGameState} />
            )}



            <div className="zone deck-container">
            <div className="zone instruction-bar">
                <p>{instruction}</p>
            </div>
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



