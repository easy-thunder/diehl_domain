// I considered making this file more modular, however, I don't anticipate in any near or distant future that I will be creating a custom game lobby.
import { JSX, useState, useRef, useEffect } from "react";
import PlayerLobbyCard from "./PlayerLobbyCard";
import PlayerMissing from "./PlayerMissing";
import TextInput from "@/components/utility/Forms/textInput/TextInput";
import { useUser } from "@/context/UserContext";
import { getUserProfile } from "@/lib/supaBase/getUserProfile";
import Peer from 'peerjs';


type LobbyUser = {
    id: string;
    name: string;
    host: boolean;
    winPercent: number;
    playing: boolean;
  };

type CustomGameLobbyProps ={
    lobbyId: string
}


export default function CustomGameLobby({lobbyId}:CustomGameLobbyProps) {

    const peer = new Peer({
        host: 'localhost',
        port: 8000,
        path: '/peerjs',
      });

    console.log("Peer ID:", peer);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const [allLobbyUsers, setAllLobbyUsers] = useState<LobbyUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {user, loading} = useUser()
    const [profile, setProfile] = useState<any>(null);
    useEffect(() => {
        if (!user || loading) return;
        getUserProfile(user.id)
          .then(setProfile)
          .catch((err) => {
            console.error("Failed to load profile:", err.message);
            setError("Couldn't load profile.");
          });
      }, [user, loading]);

      useEffect(() => {
        if (!profile || !lobbyId) return;
      
        const fetchLobby = async () => {
          try {
            const response = await fetch(`http://localhost:8000/lobby?lobbyId=${lobbyId}&name=${encodeURIComponent(profile.username || 'Guest')}&win_percent=${profile.win_percent}`, {
              headers: {
                'x-user-id': profile.id,

              },
            });
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const data = await response.json();
            setAllLobbyUsers(data.users);
          } catch (err: any) {
            setError(err.message || 'Failed to join lobby');
          }
        };
      
        fetchLobby();
      }, [profile, lobbyId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatMessages]);

    function handleChatChange(e: React.ChangeEvent<HTMLInputElement>) {
        setChatInput(e.target.value);
    }
    function handleChatSubmit() {
        if (chatInput.trim() === '') return;
        setChatMessages(prev => [...prev, chatInput.trim()]);
        setChatInput('');
    }

    // const allLobbyUsers = [
    //     {
    //         name: 'TestPlayer1',
    //         host: true,
    //         winPercent: 43,
    //         playing: true
    //     },
    //     {
    //         name: 'TestPlayer3',
    //         host: false,
    //         winPercent: 18,
    //         playing: false
    //     },
    //     {
    //         name: 'TestPlayer3',
    //         host: false,
    //         winPercent: 18,
    //         playing: false
    //     },
    //     {
    //         name: 'TestPlayer3',
    //         host: false,
    //         winPercent: 18,
    //         playing: false
    //     },
    //     {
    //         name: 'TestPlayer3',
    //         host: false,
    //         winPercent: 18,
    //         playing: false
    //     },
    //     {
    //         name: 'TestPlayer3',
    //         host: false,
    //         winPercent: 18,
    //         playing: false
    //     },
    //     {
    //         name: 'TestPlayer3',
    //         host: false,
    //         winPercent: 18,
    //         playing: false
    //     },
    //     {
    //         name: 'TestPlayer5',
    //         host: false,
    //         winPercent: 18,
    //         playing: true
    //     },
    //     {
    //         name: 'TestPlayer6',
    //         host: false,
    //         winPercent: 18,
    //         playing: true
    //     },


    // ]

    const sortedAllLobbyUsers = allLobbyUsers.sort((playerA, playerB) => {
        if (playerA.playing && !playerB.playing) return -1;
        if (!playerA.playing && playerB.playing) return 1;
        return 0;
    });
    const players = sortedAllLobbyUsers.filter((player, index) => {
        if (index > 3) return
        if (player.playing) { return player }
    });
    const spectators = sortedAllLobbyUsers.filter((player, index) => {
        if (!player.playing) return player
        if (index > 3) return player
    });




    function determinePlayer(number: number): JSX.Element | undefined {
        const thisPlayer = players[number]
        if (!thisPlayer) return <PlayerMissing />
        return <PlayerLobbyCard name={thisPlayer.name} host={thisPlayer.host} winPercent={thisPlayer.winPercent} />
    }

    if (error) return <div>Error: {error}</div>;
    if (!allLobbyUsers) return <div>Loading...</div>;
    return (
        <div className="form-box form-box__in-container transparent">
            <div className="lobby-grid">
                <div className="lobby-box players-box">
                    <div className="lobby-box__title">Players</div>
                    <div className="lobby-box__content player-grid">
                        <div className="player-slot">{determinePlayer(0)}</div>
                        <div className="player-slot">{determinePlayer(1)}</div>
                        <div className="player-slot">{determinePlayer(2)}</div>
                        <div className="player-slot">{determinePlayer(3)}</div>
                    </div>
                </div>
                <div className="lobby-box spectators-box">
                    <div className="lobby-box__title">Spectators</div>
                    <div className="lobby-box__content player-rows">{spectators.map((spectator, index) => <PlayerLobbyCard key={`${spectator.name}-${index}`} name={spectator.name} host={spectator.host} winPercent={spectator.winPercent} />)}</div>

                </div>
                <div className="lobby-box chat-box">
                    <div className="lobby-box__title">Chat</div>
                    <div className="lobby-box__content">
                        <div className="chat-messages">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className="chat-message">{msg}</div>
                            ))}
                            <div ref={messagesEndRef} />

                        </div>

                        <div className="chat-input-row">
                            <TextInput
                                label=""
                                placeholder="Type message"
                                name="lobbyChat"
                                value={chatInput}
                                onChange={handleChatChange}
                            />
                            <button className="chat-submit-button" onClick={handleChatSubmit}>Send</button>
                        </div>
                    </div>
                </div>
                <div className="lobby-box config-box">
                    <div className="lobby-box__title">Game Settings</div>
                    <div className="lobby-box__content">
                        <h2>Game id: {lobbyId}</h2>
                    </div>
                </div>

                <button className="gap-button gap-button--left">Play</button>
                <button className="gap-button gap-button--right">Spectate</button>
            </div>
        </div>
    );
}
