import { String } from "aws-sdk/clients/cloudhsm";
import DarkButton from "../button/darkButton";
import { useUser } from "@/context/UserContext";
type buttonMenuProps = {
    onClick: ()=>void
    textContent: String
    type:String
    needAuth?:boolean

}
type ButtonMenuGroupProps = {
    buttons: buttonMenuProps[];
};

export default function ButtonMenu({buttons}:ButtonMenuGroupProps){

    const {user,loading} = useUser()
    const isAuthenticated = !!user?.aud;
    return<div className="form-box form-box__in-container form-box__skinny">
        {buttons.map(button=>{
            if(button.needAuth && !isAuthenticated){return}
            return <>
                <div className="buttonContainer">
                    <DarkButton clicking={button.onClick} content={button.textContent} type={button.type} classModdifier={"btn button-natural"}/>
                </div>
            </>
        })}
    </div>
}




