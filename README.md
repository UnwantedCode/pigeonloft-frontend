# PigeonLoft Frontend

Zainstaluj:  
Sass (do kompilacji scss) - https://sass-lang.com/install/


do zrobienia na backendzie
- endpoint listy pokoi: brakuje liczby obecnych osób oraz maksymalnej liczby osób
- backend - dołaczenie i odejście po polsku
- backend - przy opuszczaniu powinna być informacja o opuszczającej osobie

import React, {useEffect, useRef, useState} from "react";
import styles from "./GameChat.module.css";
import {useParams} from "react-router-dom";
import {useAuth} from "@/Components/Auth/Auth.jsx";
import { useWebSocket } from '@/Components/Contexts/WebSocketContext.jsx';

    function GameChat(props) {
    const { decodeJwtToken } = useAuth();
    const email = decodeJwtToken()["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const { connection, backendMessages } = useWebSocket();

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const handleInputChange = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto'; // Resetuje wysokość
        textarea.style.height = `${textarea.scrollHeight}px`; // Ustawia wysokość na podstawie zawartości
        setText(event.target.value);
    };

    const handleSendMessage = () => {
        if (text.trim() && connection) {
            connection.invoke('SendMessage', text);
            setText('');
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        let newMessages = [];
        backendMessages.forEach((message) => {
            newMessages.push({ text: message.content, type: email === message.sender ? 'my' : 'enemy' });
        });
        setMessages(newMessages);
    }, [backendMessages, email]);



    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    return (
        <>
            <div className={styles.chat}>
                <div className={styles.chatHeader}>
                    <div className={styles.chatHeaderLeft}>
                        <div className={styles.chatHeaderText}>Użytkownik 1</div>
                    </div>
                    <div className={styles.chatHeaderRight}>
                        <div className={styles.chatHeaderText}>Przeciwnik</div>
                    </div>
                </div>
                <div className={styles.chatContent}>
                    <div className={styles.chatMessages}>
                        {/*                        <div className={styles.chatMessageMy}>
                            <div className={styles.chatMessageText}>Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                            </div>
                        </div>
                        <div className={styles.chatMessageEnemy}>
                            <div className={styles.chatMessageText}>Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                            </div>
                        </div>*/}
                        {messages.map((message, index) => (
                            <div key={index}
                                 className={message.type === 'my' ? styles.chatMessageMy : styles.chatMessageEnemy}>
                                <div className={styles.chatMessageText}>{message.text}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}/>
                    </div>
                    <div className={styles.chatInput}>
                        <textarea
                            ref={textareaRef}
                            className={styles.chatInputText}
                            placeholder="Napisz wiadomość..."
                            value={text}
                            onChange={handleInputChange}
                            onKeyUp={handleKeyPress}
                        />
                        <div className={styles.chatInputButton} onClick={handleSendMessage}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.8888 5.83355C20.3501 4.74619 19.2538 3.64989 18.1664 4.1112L4.80065 9.78153C3.68469 10.255 3.75086 11.8584 4.90202 12.2383L9.58127 13.7825C9.88218 13.8818 10.1182 14.1178 10.2175 14.4187L11.7617 19.098C12.1416 20.2491 13.745 20.3153 14.2185 19.1993L19.8888 5.83355ZM17.3853 2.27003C20.1282 1.1064 22.8936 3.8718 21.7299 6.61465L16.0596 19.9804C14.8654 22.7954 10.8207 22.6285 9.86241 19.7247L8.47613 15.5239L4.27527 14.1376C1.37147 13.1793 1.20457 9.1346 4.01955 7.94036L17.3853 2.27003Z"
                                    fill="#050000"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

//export default React.memo(GameChat)
export default GameChat;


----------
import styles from "./Game.module.css";
import {Helmet} from "react-helmet-async";
import GameChat from "@/Components/GameChat/GameChat.jsx";
import RockPaperScissors from "@/Components/Games/RockPaperScissors/RockPaperScissors.jsx";
import {useLocation, useParams} from "react-router-dom";
import Checkers from "@/Components/Games/Checkers/Checkers.jsx";
import LittlePeter from "@/Components/Games/LittlePeter/LittlePeter.jsx";
import {useAuth} from "@/Components/Auth/Auth.jsx";
import {useEffect, useState} from "react";
import {useWebSocket} from "@/Components/Contexts/WebSocketContext.jsx";
//show big image and some text under it



function Game() {
const { joinRoom, joinedRoom, stopConnection } = useWebSocket();
const { roomId } = useParams();
const location = useLocation();
const [game, setGame] = useState('');

    useEffect(() => {
        const joinCurrentRoom = async () => {
            const gameName = await joinRoom(parseInt(roomId));
            setGame(gameName);
        };
        if (roomId) {
            joinCurrentRoom();
        }
    }, [roomId, joinRoom]);

    useEffect(() => {
        return () => {
            stopConnection();
        };
    }, [location, stopConnection]);

    return (
        <>
            <Helmet>
                <title>Gra</title>
            </Helmet>
            <div id={styles.appContent}>
                <div className={styles.wrapper}>
                    {game === 'kpn' &&  <RockPaperScissors />}
                    {game === 'warcaby' &&  <Checkers />}
                    {game === 'piotrus' &&  <LittlePeter />}
                     <GameChat />


                </div>
            </div>
        </>
    );
}

export default Game;

----------

import React, {createContext, useContext, useState, useEffect, useCallback, useRef} from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useAuth } from '@/Components/Auth/Auth.jsx';

const WebSocketContext = createContext();
export const WebSocketProvider = ({ children }) => {
const { getJwtToken } = useAuth();
const [backendMessages, setBackendMessages] = useState([]);
const [gameState, setGameState] = useState({});
const [joinedRoom, setJoinedRoom] = useState(false);
const connectionRef = useRef(null);

    const startConnection = useCallback(async () => {
        if (!connectionRef.current) {
            try {
                const newConnection = new HubConnectionBuilder()
                    .withUrl('https://localhost:7209/hubs/gamingRoom', { accessTokenFactory: () => getJwtToken() })
                    .configureLogging(LogLevel.Information)
                    .build();

                newConnection.on('ReceiveMessage', message => {
                    setBackendMessages(prevMessages => [...prevMessages, message]);
                });
                newConnection.on('ReceiveGameState', gameState => {
                    setGameState(gameState);
                });

                await newConnection.start();
                console.log('Connection started');
                connectionRef.current = newConnection;
                return newConnection;
            } catch (error) {
                console.error('Connection failed: ', error);
            }
        } else {
            return connectionRef.current;
        }
    }, [getJwtToken]);

    const joinRoom = useCallback(async (roomId) => {
        const activeConnection = connectionRef.current || await startConnection();
        if (activeConnection) {
            try {
                const gameName = await activeConnection.invoke('JoinRoom', roomId);
                console.log(`Joined room: ${roomId}, game: ${gameName}`);
                setJoinedRoom(true);
                return gameName;
            } catch (error) {
                console.error('JoinRoom failed: ', error);
            }
        }
    }, [startConnection]);

    const stopConnection = useCallback(async () => {
        if (connectionRef.current) {
            try {
                await connectionRef.current.stop();
                console.log('Connection stopped');
                connectionRef.current = null;
                setJoinedRoom(false);
            } catch (error) {
                console.error('Stop connection failed: ', error);
            }
        }
    }, []);

    useEffect(() => {
        return () => {
            stopConnection();
        };
    }, [stopConnection]);

    return (
        <WebSocketContext.Provider value={{ connection: connectionRef.current, backendMessages, gameState, joinRoom, joinedRoom, stopConnection }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);