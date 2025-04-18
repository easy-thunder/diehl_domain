import ButtonMenu from "@/components/utility/Menu/ButtonMenu";
import { useState } from "react";
import CustomGameLobby from "../Lobby/CustomGameLobby";
import PublicOrPrivateOptions from "../PublicOrPrivateOptions";
import Modal from "@/components/utility/Modal/Modal";
export default function BHSConsole() {
  const [route, setRoute] = useState("buttonMenu");
  const [displayModal, setDisplayModal] = useState(false);
  const [existingLobbyId, setExistingLobbyId] = useState<string | null>(null);
  const buttonMenuArray = [
    {
      textContent: "Custom Game",
      onClick: () => handleModal(),
      type: "button"
    }
  ];

  function routeConsole(route: string) {
    setRoute(route);
  }

  function handleModal() {
    setDisplayModal((displayModalPrev)=>!displayModalPrev);
  }

  function renderRoute() {
    switch (route) {
      case "buttonMenu":
        return <ButtonMenu buttons={buttonMenuArray} />;
      case "customPrivateGame":
        console.log(existingLobbyId)
        return <CustomGameLobby lobbyId={existingLobbyId? existingLobbyId:crypto.randomUUID().slice(9,23)} />;
      default:
        return <>404 not found</>;
    }
  }

  return (
    <div className="BHSConsole">
      {displayModal ? <Modal component={<PublicOrPrivateOptions handleModal={()=>handleModal()} route={routeConsole} setExistingLobbyId={setExistingLobbyId} />}
       setModal={ ()=>handleModal()} /> : renderRoute()}
    </div>
  );
}
