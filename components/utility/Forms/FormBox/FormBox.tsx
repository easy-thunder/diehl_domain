import FormLogin from "../FormLogin/FormLogin"
import GuestForm from "../GuestForm/GuestForm"
import SignUpForm from "../SignUpForm/SignUpForm"
export default function FormBox(){
    return<div className="form-box">
        <FormLogin/>
        <GuestForm/>
        <SignUpForm/>
    </div>
}


