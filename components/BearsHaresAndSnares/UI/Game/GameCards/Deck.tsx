
import BackOfCards from "./BackOfCards"
type DeckProps={
    cardClass:string
}
export default function Deck({cardClass}:DeckProps){
    return(
        <>

        <BackOfCards cardClass={cardClass}/>
        </>
    )
}





