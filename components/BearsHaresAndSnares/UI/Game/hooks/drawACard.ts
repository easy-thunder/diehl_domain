
import { CardType } from "../SharedGameTypes/CardType";


export function drawACard(deck: CardType[]) {
    if (deck.length === 0) {
        return null; // Need to handle. Probably call another function to shuffle the discard pile and use that as the new deck.
    }
    const drawnCard = deck[0];// Get first in array
    const newDeck = deck.slice(1); // Get the rest of the array
    return { drawnCard, newDeck }; // Return the card and the new deck
}




