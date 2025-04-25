// Three decks of cards, shuffled and dealt is how we need to start.
// We also need to pass in who is in the game.
// We need to hold the state of the cards in the game and make them all match. 
import Deck from "./GameCards/Deck"
import Midden from "./GameCards/Midden"
export default function Game(){
    return(

        <div className='invisible-game-grid'>
            <div className="zone deck-container">
                <Deck cardClass="bear"/>
                <Midden cardClass="bear"/>
                <Deck cardClass="hare"/>
                <Midden cardClass="hare"/>
                <Deck cardClass="snare"/>
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



