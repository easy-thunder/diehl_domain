import { JSX,useState } from "react";
import PlayerLobbyCard from "./PlayerLobbyCard";





export default function CustomGameLobby() {

    const allLobbyUsers=[
        {   name:'TestPlayer1',
            host: true,
            winPercent: 43,
            playing: true
        },
        {   name:'TestPlayer2',
            host: false,
            winPercent: 33,
            playing: true
        },
        {   name:'TestPlayer3',
            host: false,
            winPercent: 18,
            playing: false
        },
        {   name:'TestPlayer4',
            host: false,
            winPercent: 18,
            playing: true
        },
        {   name:'TestPlayer5',
            host: false,
            winPercent: 18,
            playing: true
        },
        {   name:'TestPlayer6',
            host: false,
            winPercent: 18,
            playing: true
        },


    ]

    //const [playerCount, setPlayerCount] = useState(0)
    const sortedAllLobbyUsers = allLobbyUsers.filter(player => player.playing);
    const players = sortedAllLobbyUsers.slice(0, 4);
    const spectators = sortedAllLobbyUsers.slice(4);





function determinePlayer(number:number):JSX.Element|undefined{
    const thisPlayer = players[number]
    if(!thisPlayer) return
    return <PlayerLobbyCard name={thisPlayer.name} host={thisPlayer.host} winPercent={thisPlayer.winPercent} />
}

function determinSpectator(number:number): JSX.Element|undefined{
    const thisSpectator = spectators[number]
    if(!thisSpectator) return
    return 
}

    return (
<div className="form-box form-box__in-container transparent">
  <div className="lobby-grid">
    <div className="lobby-box players-box">
        <div className="lobby-box__title">Players</div>
            <div className="lobby-box__content player-grid">
                <div className="player-slot">{determinePlayer(0)}</div> {/* player name, kick button, host?, winPercent, connection status, player number(to confirm player is in right spot*/}
                <div className="player-slot">{determinePlayer(1)}</div>
                <div className="player-slot">{determinePlayer(2)}</div>
                <div className="player-slot">{determinePlayer(3)}</div>
            </div>
        </div>
    <div className="lobby-box spectators-box">
        <div className="lobby-box__title">Spectators</div>
        <div className="lobby-box__content player-rows">{spectators.map(spectator=><PlayerLobbyCard name={spectator.name} host={spectator.host} winPercent={spectator.winPercent}/>)}</div>

    </div>
    <div className="lobby-box chat-box">
        <div className="lobby-box__title">Chat</div>
        <div className="lobby-box__content"></div>
    </div>
    <div className="lobby-box config-box">
        <div className="lobby-box__title">Game Settings</div>
        <div className="lobby-box__content"></div>
    </div>

    <button className="gap-button gap-button--left">Play</button>
    <button className="gap-button gap-button--right">Spectate</button>
  </div>
</div>
    );
  }
  