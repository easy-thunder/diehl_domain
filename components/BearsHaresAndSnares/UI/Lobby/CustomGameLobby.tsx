// I considered making this file more modular, however, I don't anticipate in any near or distant future that I will be creating a custom game lobby.
import { JSX, useState, useRef, useEffect } from "react";
import PlayerLobbyCard from "./PlayerLobbyCard";
import PlayerMissing from "./PlayerMissing";
import TextInput from "@/components/utility/Forms/textInput/TextInput";
import { useUser } from "@/context/UserContext";
import { getUserProfile } from "@/lib/supaBase/getUserProfile";
import Peer, { DataConnection } from 'peerjs';
import { ClientPageRoot } from "next/dist/client/components/client-page";
import { useLeaveLobby } from "../../GameHooks/useLeaveLobby";

type LobbyUser = {
    id: string;
    name: string;
    host: boolean;
    winPercent: number;
    playing: boolean;
    peerId: string;
  };

type CustomGameLobbyProps ={
    lobbyId: string | null | undefined
}
type ChatMessage ={
  message:string;
  userName:string;
  peerId: string;
}


export default function CustomGameLobby({lobbyId}:CustomGameLobbyProps) {
    const [peerId, setPeerId] = useState<string>('');
    const peerRef = useRef<null| Peer>(null);
    const connectionsRef = useRef<{ [peerId: string]: DataConnection }>({});
    const [connections, setConnections] = useState<DataConnection[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [allLobbyUsers, setAllLobbyUsers] = useState<LobbyUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {user, loading} = useUser()
    const [profile, setProfile] = useState<any>(null);
    const handshakeUrl = process.env.NEXT_PUBLIC_HANDSHAKE_URL;
    const {leaveLobby} = useLeaveLobby()
    console.log(handshakeUrl)

    //Setup peer, listen for connections
    useEffect(() => {

      function handleBeforeUnload(){
        // Optional: notify other peers you're leaving
        
        Object.values(connectionsRef.current).forEach(conn => {
          conn.send({
            type: "user_left",
            from: { peerId: peerRef.current?.id },
          });
        });
    
        peer.destroy();
      };
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
                const newUser = data.from as { name: string; peerId: string; winPercent: number };
                console.log(`🚀 ${newUser.name} (${newUser.peerId}) just joined!`);
              
                setAllLobbyUsers(prev => {
                  const alreadyExists = prev.some(u => u.id === newUser.peerId);
                  if (alreadyExists) return prev;
              
                  return [
                    ...prev,
                    {
                      id: newUser.peerId,
                      name: newUser.name,
                      host: false,
                      winPercent: newUser.winPercent,
                      playing: true,
                      peerId: newUser.peerId,
                    },
                  ];
                });
              
                // 🔁 CONNECT BACK TO NEW USER (if we haven't yet)
                if (!connectionsRef.current[newUser.peerId]) {
                  const conn = peerRef.current?.connect(newUser.peerId);
                  if (!conn) return;
              
                  conn.on("open", () => {
                    console.log(`🔁 Connected back to ${newUser.name} (${newUser.peerId})`);
                    connectionsRef.current[newUser.peerId] = conn;
                    setConnections(Object.values(connectionsRef.current));

                  });
              
                  conn.on("close", () => {
                    console.log(`🔁 Connection to ${newUser.peerId} closed`);

                    delete connectionsRef.current[newUser.peerId];
                    setConnections(Object.values(connectionsRef.current));

                  });
              
                  conn.on("error", (err) => {
                    console.error("❗ Peer connection error (connect-back):", err);
                  });
                }
                //setChatMessages(prev=>[...prev,{`${newUser.name} has joined`}])
                chatMessageHandler(`${newUser.name} has joined`,'**System**','NA')
              }

              if(data.type==='chat_message'){
                const messageObject=data.from as {name:string, peerId:string, message:string}
               // setChatMessages(prev => [...prev, messageObject.message.trim()]);
                chatMessageHandler(messageObject.message.trim(),messageObject.name,messageObject.peerId)
              }

              if (data.type === "user_left") {
                console.log('a user is leaving')
                const peerIdWhoLeft = data.from.peerId;
                console.log(`👋 ${peerIdWhoLeft} has left the lobby`);
              
                // Clean up user from the lobby UI
                console.log(allLobbyUsers,'this is right before setting the lobby users')
                setAllLobbyUsers(prev => prev.filter(u => u.peerId !== peerIdWhoLeft));
              
                // Optionally remove connection
                delete connectionsRef.current[peerIdWhoLeft];
              }
            });
          });
          
    
        peerRef.current = peer;
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => peer.destroy();

    },[])
    //Save before getting to far
    function chatMessageHandler(message:string,userName:string,peerId:string){
      setChatMessages(prev=>[...prev,{message,userName,peerId}])
    }
    // load user profile
    useEffect(() => {
        if (!user || loading || profile) return; 
        getUserProfile(user.id)
          .then(setProfile)
          .catch((err) => {
            console.error("Failed to load profile:", err.message);
            setError("Couldn't load profile.");
          });
      }, [user, loading]);
      // Get the lobby and send connections
      useEffect(() => {
        if (!profile || !peerId) return;
      
        const isCreatingLobby = !lobbyId;
      
        const fetchLobby = async () => {
          try {
            const lobbyUrl = `${handshakeUrl}/lobby/${lobbyId}`;
            const response = await fetch(lobbyUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-user-id": profile.id,
              },
              body: JSON.stringify({
                peerId,
                name: profile.username,
                win_percent: profile.win_percent,
              }),
            });
      
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
            const data = await response.json();
            setAllLobbyUsers(data.users);
      
            if (!isCreatingLobby) {
              const others = data.users.filter((u: any) => u.peerId !== peerId);
              others.forEach((u: any) => {
                if (!connectionsRef.current[u.peerId]) {
                  const conn = peerRef.current?.connect(u.peerId);
                  if (!conn) return;
      
                  conn.on("open", () => {
                    console.log(`🔌 Connected to ${u.name} (${u.peerId})`);
                    connectionsRef.current[u.peerId] = conn;
                    setConnections(prev => [...prev, conn]);
                    console.log("about to send join notification");
                    conn.send({
                      type: "join_notification",
                      from: {
                        name: profile.username,
                        peerId,
                        winPercent: profile.win_percent,
                      },
                    });
                  });
      
                  conn.on("close", () => {
                    console.log(`❌ Connection to ${u.peerId} closed`);
                    leaveLobby(lobbyId, peerId)
                    location.reload();
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
            console.error(err.message + " Failed to join/create lobby");
            setError(err.message || "Failed to join lobby");
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
      console.log(connections,'connections in handle chat')
      connections.forEach(conn=>{
        conn.send({
          type: "chat_message",
          from: {
            name: profile.username,
            peerId,
            message: chatInput
          }
        })
      })


        if (chatInput.trim() === '') return;
        //setChatMessages(prev => [...prev, {message: chatInput.trim(), username: profile.username, peerId}]);
        chatMessageHandler(chatInput.trim(),profile.username, peerId)
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


    async function swapToSpectate(){
      console.log('hi')
      const response = await fetch(`${handshakeUrl}/lobby/spectate`, {
        
      })
    }

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
                                <div key={`${i}${msg.message}${msg.peerId}${msg.userName}`} className={`chat-message ${msg.peerId===peerId? `chat-message__me`:null} ${msg.peerId==='NA'?'chat-message__system':null}`}>{msg.userName}: {msg.message}</div>
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

                <button className="gap-button gap-button--left" >Play</button>
                <button className="gap-button gap-button--right" onClick={()=>swapToSpectate()}>Spectate</button>
            </div>
        </div>
    );
}
