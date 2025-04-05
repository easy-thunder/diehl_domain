
export default function DarkButton({content, clicking, type="button", classModdifier=""}){
    return(
        <>
        <button onClick={clicking? clicking: null} className={`btn ${classModdifier? classModdifier:"btn-dark btn-animated"} type={type}`}>
            {content}
        </button>

        </>
    )
}


