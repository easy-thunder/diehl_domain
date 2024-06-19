
export default function DarkButton({content, clicking}){
    // onClick()
    return(
        <>
        <p onClick={clicking? clicking: null} className="btn btn-dark btn-animated">
            {content}
        </p>.

        </>
    )
}


