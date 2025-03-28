import TextInput from "../textInput/TextInput"
import DarkButton from "../../button/darkButton"
import SocialsComponent from "../SocialsComponent";

export default function FormLogin(){  
    

    return(<div className="spaceBelow">
        <h1>Login for Games</h1>
        <form>
            <div className="inputContainer">
                <TextInput label="Email" placeholder="Please Enter Email" name="Email" type="email"/>
                <TextInput label="Password" placeholder="Please Enter Password" name="Password" type="password"/>
            </div>
            <div className="buttonContainer">

            <DarkButton content="Login" type="submit" clicking=""/>
            </div>
        </form>
        <span>Or login with:</span>
        <SocialsComponent />
            
    </div>
)}