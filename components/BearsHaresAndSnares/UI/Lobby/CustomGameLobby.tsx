
// 1. How to handle the lobby creation and joining
// 2. Coupling peer connections with the lobby
// 3. When peer connection is closed how to update the lobby and how to update the other players UI

// 4. I could modularize this code more and clean it up. But as it is it currently works.

import { JSX, useState, useRef, useEffect } from "react";
import PlayerLobbyCard from "./PlayerLobbyCard";
import PlayerMissing from "./PlayerMissing";
import TextInput from "@/components/utility/Forms/textInput/TextInput";
import { useUser } from "@/context/UserContext";
import { getUserProfile } from "@/lib/supaBase/getUserProfile";
import Peer, { DataConnection } from 'peerjs';
import { useLeaveLobby } from "./hooks/useLeaveLobby";
import Game from "../Game/Game";

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
    route: (routeName: string) => void
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
    // const chatInputRef = useRef<HTMLInputElement>(null);//JAKE wasn't used any where but I made it so maybe I need it later?
    const [playGameStarted, setPlayGameStarted] = useState(false);

    

    
    useEffect(() => {

      function handleBeforeUnload(){
        
        
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
            
        });
            
        peer.on('call', call => {
            
            
            
        });
        peer.on("connection", conn => {
          
            conn.on("data", (data: any) => {
              if(data.type === "user_status_changed"){
                const userStatus = data.from as { peerId: string; playing: boolean; name: string; winPercent: number; host: boolean };
                
                setAllLobbyUsers(prev => {
                  const userIndex = prev.findIndex(u => u.peerId === userStatus.peerId);
                  if (userIndex !== -1) {
                    const updatedUser = { ...prev[userIndex], playing: userStatus.playing, host: userStatus.host, winPercent: userStatus.winPercent };
                    const updatedUsers = [...prev];
                    updatedUsers[userIndex] = updatedUser;
                    return updatedUsers;
                  }
                  return prev;
                })
              }
              


              if (data.type === "join_notification") {
                const newUser = data.from as { name: string; peerId: string; winPercent: number };
                
              
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
              
                if (!connectionsRef.current[newUser.peerId]) {
                  const conn = peerRef.current?.connect(newUser.peerId);
                  if (!conn) return;
              
                  conn.on("open", () => {
                    
                    connectionsRef.current[newUser.peerId] = conn;
                    setConnections(Object.values(connectionsRef.current));

                  });
              
                  conn.on("close", () => {
                    

                    delete connectionsRef.current[newUser.peerId];
                    setConnections(Object.values(connectionsRef.current));

                  });
              
                  conn.on("error", (err) => {
                    console.error("❗ Peer connection error (connect-back):", err);
                  });
                }
                
                chatMessageHandler(`${newUser.name} has joined`,'**System**','NA')
              }

              if(data.type==='chat_message'){
                const messageObject=data.from as {name:string, peerId:string, message:string}
               
                chatMessageHandler(messageObject.message.trim(),messageObject.name,messageObject.peerId)
              }
              

              if (data.type === "user_left") {
                
                const peerIdWhoLeft = data.from.peerId;
                
              
                
                
                setAllLobbyUsers(prev => prev.filter(u => u.peerId !== peerIdWhoLeft));
              
                
                delete connectionsRef.current[peerIdWhoLeft];
              }
              if(data.type === "game_start"){
                setPlayGameStarted(()=>true)
              }
            });

            conn.on("close", () => {
              
              setAllLobbyUsers(prev =>
                prev.map(user =>
                  user.peerId === conn.peer
                    ? { ...user, playing: false } 
                    : user
                )
              );

            });
          });


          
          
    
        peerRef.current = peer;
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => peer.destroy();

    },[])
    
    function chatMessageHandler(message:string,userName:string,peerId:string){
      setChatMessages(prev=>[...prev,{message,userName,peerId}])
    }
    
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
                    
                    connectionsRef.current[u.peerId] = conn;
                    setConnections(prev => [...prev, conn]);
                    
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
              
            } else {
              
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


    async function updatePlayerStatus(playing: boolean) {
      if(!profile) return;
      if(profile.playing === playing) return;
      if(playing===true&& players.length>=4){
        alert("There are already 4 players in the game");
        return
      }

      try {
        const response = await fetch(`${handshakeUrl}/lobby/${lobbyId}/status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            peerId,
            playing,
          }),
        });
    
        if (!response.ok) throw new Error("Failed to update player status");
    
        setAllLobbyUsers(prev =>
          prev.map(user =>
            user.peerId === peerId ? { ...user, playing } : user
          )
        );

        connections.forEach(conn =>{
          conn.send({
            type: "user_status_changed",
            from:{
              peerId,
              playing,
              name: profile.username,
              winPercent: profile.win_percent,
              host: profile.host
            }
          })
        })
      } catch (err) {
        console.error("Error updating player status:", err);
        setError("Unable to update player status");
      }
    }

    function determinePlayer(number: number): JSX.Element | undefined {
        const thisPlayer = players[number]
        if (!thisPlayer) return <PlayerMissing />
        return <PlayerLobbyCard name={thisPlayer.name} host={thisPlayer.host} winPercent={thisPlayer.winPercent} />
    }

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        const input = document.querySelector('input[name="lobbyChat"]') as HTMLInputElement;
        if (!input) return;
    
        const isFocused = document.activeElement === input;
    
        if (e.key === 'Enter') {
          if (isFocused) {
            e.preventDefault();
            handleChatSubmit();
            input.blur();
          } else {
            input.focus();
          }
        }
      };
    
      document.addEventListener('keydown', handleKeyDown);
    
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleChatSubmit]);


    function buildGame(){
      
      setPlayGameStarted(()=> true)
      connections.forEach(conn=>{
        conn.send({
          type: "game_start",
          from: {
            peerId,
            playing: true
          }
        })
      })
    }

    if (error) return <div>Error: {error}</div>;
    if (!allLobbyUsers) return <div>Loading...</div>;
    return (
      <>
    {playGameStarted? <Game players={players} peerId={peerId} thisUserProfile={profile}   connections={Object.values(connectionsRef.current)} 
    />:<>
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
                        <button onClick={()=>buildGame()} className="play-button">Play</button>
                    </div>
                </div>

                <button className="gap-button gap-button--left" onClick={()=>updatePlayerStatus(true)}>Play</button>
                <button className="gap-button gap-button--right" onClick={()=>updatePlayerStatus(false)}>Spectate</button>
            </div>
        </div>
      </>}
      </>
    );
}
