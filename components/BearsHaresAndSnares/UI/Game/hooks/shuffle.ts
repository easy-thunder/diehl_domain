
import { CardType } from "../SharedGameTypes/CardType";

export function shuffle(deck: CardType[]) {
    return deck.slice().sort(() => Math.random() - 0.5);
}


