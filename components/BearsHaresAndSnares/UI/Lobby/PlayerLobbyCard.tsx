

type playerLobbyCardProps = {
    name:string
    host: boolean
    winPercent: number
}


export default function PlayerLobbyCard({ name, host, winPercent }: playerLobbyCardProps) {
    return (
      <div className="player-card">
        <div className="player-card__header">
          <span className="player-card__name">{name}</span>
          {host && <span className="player-card__host-badge">Host</span>}
        </div>
        <div className="player-card__stats">
          <span className="player-card__win">Win Rate: {winPercent}%</span>
        </div>
      </div>
    );
  }
