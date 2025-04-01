import ButtonMenu from "@/components/utility/Menu/ButtonMenu";
import { useState } from "react";
import CustomGameLobby from "../Lobby/CustomGameLobby";

export default function BHSConsole(){
    const buttonMenuArray=[
        {textContent:'Custom Game', onClick:()=>routeConsole('customGame'), type:'button'}
        
    ]
    const [route,setRoute]=useState('buttonMenu')
    function routeConsole(route:string){
        setRoute(prev=>prev=route)
    }
    
    //onClick, content, type
    //auth: store, profile, friends
    // unauth: custom game, quick game, about
    function renderRoute(){
        switch(route){
            case('buttonMenu'):
                return <ButtonMenu buttons={buttonMenuArray} />
            case('customGame'):
                return <CustomGameLobby />
            default:
                return<>404 not found</>
        }
    }

    return<>
        <div className="BHSConsole">
            {renderRoute()}
        </div>
    </>
}




