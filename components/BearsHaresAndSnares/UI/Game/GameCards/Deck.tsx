import { CardType } from "../SharedGameTypes/CardType"
import BackOfCards from "./BackOfCards"
import { shuffle } from "../hooks/shuffle"
import { drawACard } from "../hooks/drawACard"
import { useState } from "react"
type DeckProps={
    cardClass:string
    deckCards?: CardType[]
}
export default function Deck({cardClass, deckCards}:DeckProps){
    const countOfCards = deckCards?.length || 0
    const [shuffledDeck,setShuffledDeck] = useState<CardType[]>(shuffle(deckCards || []))


    return(
        <>
        <BackOfCards cardClass={cardClass} countOfCards={countOfCards} 
          onClick={() => {
            const result=drawACard(shuffledDeck)
            if(!result) return
            setShuffledDeck(()=>result.newDeck)


          }}
        />
        </>
    )
}





