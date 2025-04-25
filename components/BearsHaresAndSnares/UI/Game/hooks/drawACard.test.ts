import { drawACard } from "./drawACard";
import { bearCards } from "../CardData/bearCards";

describe("drawACard", () => {
    it("should return null if the deck is empty", () => {
        const result = drawACard([]);
        expect(result).toBeNull();
    });

    it("should return the first card and the new deck", () => {
        const deck = bearCards;
        const result = drawACard(deck)
        if(!result){
            throw new Error("Expected result to be not null");
        }
        const { drawnCard, newDeck } = result;

        expect(drawnCard).toEqual(deck[0]);
        expect(newDeck).toEqual(deck.slice(1));
    });

    it("should return the correct card when called multiple times", () => {
        const deck = bearCards;
        const result = drawACard(deck);
        if(!result){
            throw new Error("Expected result to be not null");
        }
        const result2 = drawACard(result.newDeck);
        if(!result2){
            throw new Error("Expected result2 to be not null");
        }
        const { drawnCard: firstDrawnCard, newDeck: firstNewDeck } = result;
        const { drawnCard: secondDrawnCard, newDeck: secondNewDeck } = result2;

        expect(firstDrawnCard).toEqual(deck[0]);
        expect(secondDrawnCard).toEqual(deck[1]);
        expect(secondNewDeck).toEqual(firstNewDeck.slice(1));
    });
})

