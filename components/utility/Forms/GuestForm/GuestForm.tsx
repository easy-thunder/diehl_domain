import TextInput from "../../../BearsHaresAndSnares/UI/FormBox/textInput/TextInput"
import DarkButton from "../../button/darkButton"
export default function GuestForm(){  
    return(<div>
        <h1>Guest Access</h1>
        <p>Don't want to create an account? Create a guest account for your session.</p>
            <div className="buttonContainer">
            <DarkButton content="Guest Pass" type="submit" clicking=""/>
            </div>
    </div>
)}