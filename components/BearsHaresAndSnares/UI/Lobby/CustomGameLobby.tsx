import { JSX, useState, useRef, useEffect } from "react";
import PlayerLobbyCard from "./PlayerLobbyCard";
import PlayerMissing from "./PlayerMissing";
import TextInput from "@/components/utility/Forms/textInput/TextInput";




export default function CustomGameLobby() {

    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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

    const allLobbyUsers = [
        {
            name: 'TestPlayer1',
            host: true,
            winPercent: 43,
            playing: true
        },
        // {   name:'TestPlayer2',
        //     host: false,
        //     winPercent: 33,
        //     playing: true
        // },
        {
            name: 'TestPlayer3',
            host: false,
            winPercent: 18,
            playing: false
        },
        {
            name: 'TestPlayer3',
            host: false,
            winPercent: 18,
            playing: false
        },
        {
            name: 'TestPlayer3',
            host: false,
            winPercent: 18,
            playing: false
        },
        {
            name: 'TestPlayer3',
            host: false,
            winPercent: 18,
            playing: false
        },
        {
            name: 'TestPlayer3',
            host: false,
            winPercent: 18,
            playing: false
        },
        {
            name: 'TestPlayer3',
            host: false,
            winPercent: 18,
            playing: false
        },
        // {   name:'TestPlayer4',
        //     host: false,
        //     winPercent: 18,
        //     playing: true
        // },
        {
            name: 'TestPlayer5',
            host: false,
            winPercent: 18,
            playing: true
        },
        {
            name: 'TestPlayer6',
            host: false,
            winPercent: 18,
            playing: true
        },


    ]

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


    console.log(players.length, spectators.length,)


    function determinePlayer(number: number): JSX.Element | undefined {
        const thisPlayer = players[number]
        if (!thisPlayer) return <PlayerMissing />
        return <PlayerLobbyCard name={thisPlayer.name} host={thisPlayer.host} winPercent={thisPlayer.winPercent} />
    }


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
                    <div className="lobby-box__content player-rows">{spectators.map(spectator => <PlayerLobbyCard name={spectator.name} host={spectator.host} winPercent={spectator.winPercent} />)}</div>

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
                    <div className="lobby-box__content"></div>
                </div>

                <button className="gap-button gap-button--left">Play</button>
                <button className="gap-button gap-button--right">Spectate</button>
            </div>
        </div>
    );
}
