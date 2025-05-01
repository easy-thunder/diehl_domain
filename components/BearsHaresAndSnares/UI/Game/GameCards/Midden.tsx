import BackOfCards from "./BackOfCards"
type DeckProps={
    cardClass:string
}
export default function Midden({cardClass}:DeckProps){
    return(
<div className={`BHS_card BHS_midden BHS_back-of-card-${cardClass}`}>
        
</div>      
    )
}