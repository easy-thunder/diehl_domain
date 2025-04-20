// I considered making this file more modular, however, I don't anticipate in any near or distant future that I will be creating a custom game lobby.
import { JSX, useState, useRef, useEffect } from "react";
import PlayerLobbyCard from "./PlayerLobbyCard";
import PlayerMissing from "./PlayerMissing";
import TextInput from "@/components/utility/Forms/textInput/TextInput";
import { useUser } from "@/context/UserContext";
import { getUserProfile } from "@/lib/supaBase/getUserProfile";
import Peer, { DataConnection } from 'peerjs';


type LobbyUser = {
    id: string;
    name: string;
    host: boolean;
    winPercent: number;
    playing: boolean;
  };

type CustomGameLobbyProps ={
    lobbyId: string | null | undefined
}


export default function CustomGameLobby({lobbyId}:CustomGameLobbyProps) {
    const [peerId, setPeerId] = useState<null|string>(null);
    const peerRef = useRef<null| Peer>(null);
    const connectionsRef = useRef<{ [peerId: string]: DataConnection }>({});

    useEffect(() => {
        const peer = new Peer();
        peer.on('open', id => {
            setPeerId(id);
            console.log('My peer ID is:', id);
        });
            
        peer.on('call', call => {
            
            // Not using this but eventually will use for chat functionality
            console.log('Incoming call from:', call.peer);
        });
        peer.on("connection", conn => {
            conn.on("data", (data: any) => {
              if (data.type === "join_notification") {
                console.log('join notification has been received')
                const newUser = data.from as {name: string, peerId: string, winPercent:number};
                console.log(`🚀 ${newUser.name} (${newUser.peerId}) just joined!`);
                setAllLobbyUsers(prev => {
                  const alreadyExists = prev.some(u => u.id ===  newUser.peerId);
                  if (alreadyExists) return prev;
          
                  return [...prev, {
                    id: newUser.peerId,
                    name: newUser.name,
                    host: false,
                    winPercent: newUser.winPercent,
                    playing: true,
                    peerId: newUser.peerId,
                  }];
                });
              }
            });
          
            conn.on("open", () => {
              console.log("🟢 Received peer connection from", conn.peer);
              connectionsRef.current[conn.peer] = conn;
            });
          
            conn.on("close", () => {
              console.log("🔴 Connection from", conn.peer, "closed");
              delete connectionsRef.current[conn.peer];
            });
          
            conn.on("error", (err) => {
              console.error("⚠️ Incoming connection error:", err);
            });
          });
          
    
        peerRef.current = peer;
        return () => peer.destroy();

    },[])
    console.log(peerId)

    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const [allLobbyUsers, setAllLobbyUsers] = useState<LobbyUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {user, loading} = useUser()
    const [profile, setProfile] = useState<any>(null);
    useEffect(() => {
        if (!user || loading || profile) return; 
        getUserProfile(user.id)
          .then(setProfile)
          .catch((err) => {
            console.error("Failed to load profile:", err.message);
            setError("Couldn't load profile.");
          });
      }, [user, loading]);

      useEffect(() => {
        if (!profile || !peerId) return;
      
        const isCreatingLobby = !lobbyId;
      
        const fetchLobby = async () => {
          try {
            const response = await fetch(`http://localhost:8000/lobby?lobbyId=${lobbyId}&peerId=${peerId}&name=${encodeURIComponent(profile.username)}&win_percent=${profile.win_percent}`, {
              headers: {
                'x-user-id': profile.id,
              },
            });
      
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const data = await response.json();
            setAllLobbyUsers(data.users);
            if (!isCreatingLobby) {
                const others = data.users.filter((u:any) => u.peerId !== peerId);
                others.forEach((u:any)=> {
                  if (!connectionsRef.current[u.peerId]) {
                    const conn = peerRef.current?.connect(u.peerId);
                    if (!conn) return;
              
                    conn.on("open", () => {
                      console.log(`🔌 Connected to ${u.name} (${u.peerId})`);
                      connectionsRef.current[u.peerId] = conn;
                      console.log('about to send join notification')
                      conn.send({
                        type: "join_notification",
                        from: {
                          name: profile.username,
                          peerId,
                          winPercent: profile.win_percent
                        },
                      });
                    });
              
                    conn.on("close", () => {
                      console.log(`❌ Connection to ${u.peerId} closed`);
                      delete connectionsRef.current[u.peerId];
                    });
              
                    conn.on("error", (err) => {
                      console.error("❗ Peer connection error:", err);
                    });
                  }
                });
              }
              
      
            if (isCreatingLobby) {
              console.log("Created new lobby as host:", lobbyId);
            } else {
              console.log("Joined existing lobby:", lobbyId);
            }
      
          } catch (err: any) {
            console.error(err.message + ' Failed to join/create lobby');
            setError(err.message || 'Failed to join lobby');
          }
        };
      
        fetchLobby();
      }, [profile, peerId]);


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
