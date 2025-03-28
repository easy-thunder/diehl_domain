
export default function DarkButton({content, clicking, type="button"}){
    // onClick()
    return(
        <>
        <button onClick={clicking? clicking: null} className="btn btn-dark btn-animated">
            {content}
        </button>

        </>
    )
}


