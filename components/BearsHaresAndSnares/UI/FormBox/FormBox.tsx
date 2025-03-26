import DarkButton from "@/components/utility/button/darkButton"
import FormLogin from "../../../utility/Forms/FormLogin/FormLogin"
import GuestForm from "../../../utility/Forms/GuestForm/GuestForm"
import SignUpForm from "../../../utility/Forms/SignUpForm/SignUpForm"
export default function FormBox(){
    

    return<div className="form-box">
        <div className="buttonContainer">
            <DarkButton content="Login" type="button" clicking=""/>
        </div>
        <FormLogin/>
        <div className="buttonContainer">
            <DarkButton content="Sign Up" type="button" clicking=""/>
        </div>
        <SignUpForm/>
        <GuestForm/>
    </div>
}


