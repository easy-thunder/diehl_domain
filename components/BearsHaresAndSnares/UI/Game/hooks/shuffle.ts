
import { CardType } from "../SharedGameTypes/CardType";

export function shuffle(deck: CardType[]) {
    return deck.sort(() => Math.random() - 0.5);
}


