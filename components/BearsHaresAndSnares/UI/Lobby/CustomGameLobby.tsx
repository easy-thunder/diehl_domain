




export default function CustomGameLobby() {
    return (
<div className="form-box form-box__in-container transparent">
  <div className="lobby-grid">
    <div className="lobby-box players-box">
        <div className="lobby-box__title">Players</div>
        <div className="lobby-box__content player-grid">
        <div className="player-slot">Player 1</div>
        <div className="player-slot">Player 2</div>
        <div className="player-slot">{/* Maybe empty */}</div>
        <div className="player-slot">{/* Maybe empty */}</div>



        </div>
    </div>
    <div className="lobby-box spectators-box">
        <div className="lobby-box__title">Spectators</div>
        <div className="lobby-box__content"></div>

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
  