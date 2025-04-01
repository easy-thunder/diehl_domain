
export default function DarkButton({content, clicking, type="button", classModdifier=""}){
    // onClick()
    return(
        <>
        <button onClick={clicking? clicking: null} className={classModdifier? classModdifier:"btn btn-dark btn-animated"} type={type}>
            {content}
        </button>

        </>
    )
}


