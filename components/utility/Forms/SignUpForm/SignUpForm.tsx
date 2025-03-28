import TextInput from "../textInput/TextInput"
import DarkButton from "../../button/darkButton"
import SocialsComponent from "../SocialsComponent"

export default function SignUpForm(){  
    return(<div className="spaceBelow">
        <h1>Sign Up</h1>
        <p> Enable voice chat, start instant messaging, and make a friends list by making an account.</p>
        <form>
            <div className="inputContainer">

                <TextInput label="Email" placeholder="Please Enter Email" name="Email" type="email"/>
                <TextInput label="User Name" placeholder="Please Enter User Name" name="UserName" type="text"/>
                <TextInput label="Password" placeholder="Please Enter Password" name="Password" type="password"/>
                <TextInput label="Confirm Password" placeholder="Please Confirm Password" name="ConfirmPassword" type="password"/> 
            </div> 
            <div className="buttonContainer">

            <DarkButton content="Sign Up" type="submit" clicking=""/>
            </div>
        </form>
            <p>Or sign up with:</p>
        <SocialsComponent />

            
    </div>
)}