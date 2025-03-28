import DarkButton from "@/components/utility/button/darkButton"
import FormLogin from "../../../utility/Forms/FormLogin/FormLogin"
import GuestForm from "../../../utility/Forms/GuestForm/GuestForm"
import SignUpForm from "../../../utility/Forms/SignUpForm/SignUpForm"
import {useState} from "react"
export default function FormBox(){

    const [loginToggle, setLoginToggle] = useState(true);

    const toggleLoginAndSignUp = (e:any) => {
        setLoginToggle(prev=>!prev)
    }


    return<div className="form-box">
        {loginToggle?
            <FormLogin/>
            :
            null
        }
        {loginToggle?
            <div>
            <div className="buttonContainer">
                <DarkButton content="Sign Up Instead" type="button" clicking={toggleLoginAndSignUp}/>
            </div>
            </div>
            :
            <div>
                <SignUpForm/>
                <div className="buttonContainer">
                    <DarkButton content="Log in Instead" type="button" clicking={toggleLoginAndSignUp}/>
                </div>
            </div>
        }
        <GuestForm/>
    </div>
}


