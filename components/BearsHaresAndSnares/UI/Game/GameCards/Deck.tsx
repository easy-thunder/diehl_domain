import { CardType } from "../SharedGameTypes/CardType"
import BackOfCards from "./BackOfCards"
import { shuffle } from "../hooks/shuffle"
// import { drawACard } from "../hooks/drawACard"
import { useState } from "react"
// import { GameStateType } from "../SharedGameTypes/gameState"
type DeckProps={
    cardClass:string
    deckCards?: CardType[]
    onClick?: () => void
}
export default function Deck({cardClass, deckCards, onClick}:DeckProps){
    const countOfCards = deckCards?.length || 0
    const [shuffledDeck,setShuffledDeck] = useState<CardType[]>(shuffle(deckCards || []))


    return(
        <>
        <BackOfCards cardClass={cardClass} countOfCards={countOfCards} 
          onClick={onClick}
        />
        </>
    )
}





