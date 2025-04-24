
type BackOfCardsProps={
    cardClass:string
}

export default   function BackOfCards({cardClass}: BackOfCardsProps){
    return(<>
        <div className={`BHS_card BHS_back-of-card-${cardClass}`}>

        </div>

        </>
    )
}
