
type BackOfCardsProps={
    cardClass:string
    countOfCards?: number
    onClick?: () => void
}

export default   function BackOfCards({cardClass,countOfCards, onClick}: BackOfCardsProps){
    return(<>
        <div className={`BHS_card BHS_back-of-card-${cardClass}`} onClick={onClick}>
            <p className="countOfCards">{countOfCards}</p>
        </div>
        </>
    )
}
