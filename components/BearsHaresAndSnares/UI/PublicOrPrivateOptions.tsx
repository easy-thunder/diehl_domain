
import DarkButton from "@/components/utility/button/darkButton"
import TextInput from "@/components/utility/Forms/textInput/TextInput";

type PublicOrPrivateOptionsProps = {
    route: (routeName: string) => void
    handleModal?: () => void
    setExistingLobbyId: (lobbyId: string) => void
  };

export default function PublicOrPrivateOptions({route, handleModal, setExistingLobbyId}:PublicOrPrivateOptionsProps){



    return<>
        <h2 style={{justifySelf:"center"}}>Public or Private</h2>
        <div className="buttonContainer">
            <DarkButton classModdifier="button-natural" content="Create Public" type="button" clicking={()=>{route("customPublicGame")}}/>
        </div>
        <div className="buttonContainer">
            <DarkButton  classModdifier="button-natural" content="Create Private" type="button" clicking={() => {route("customPrivateGame"); handleModal&& handleModal()}}/>
        </div>
        <div className="buttonContainer">
            <DarkButton  classModdifier="button-natural" content="Game List" type="button" clicking={() => {route("gameList"); handleModal&& handleModal()}}/>
        </div>
        <div style={{ display: 'grid', justifyContent: 'center' }}>
        <TextInput label="Join Custom Game"  placeholder="paste existing game id" name="gameID" onChange={(e)=>setExistingLobbyId(e.target.value)} customLabelStyle={{textAlign:'left'}}  />
            <button className="chat-submit-button" onClick={()=>{route("customPrivateGame"); handleModal&& handleModal()}}>
                Submit
            </button>
        </div>
    </>
}




