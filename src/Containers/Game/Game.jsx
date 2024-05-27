import styles from "./Game.module.css";
import {Helmet} from "react-helmet-async";
import GameChat from "@/Components/GameChat/GameChat.jsx";
import RockPaperScissors from "@/Components/Games/RockPaperScissors/RockPaperScissors.jsx";
import {useLocation, useParams} from "react-router-dom";
import Checkers from "@/Components/Games/Checkers/Checkers.jsx";
import LittlePeter from "@/Components/Games/LittlePeter/LittlePeter.jsx";
import {useEffect, useState} from "react";
import SignalRService from "@/Components/SignalRService/SignalRService.jsx";
import {useAuth} from "@/Components/Auth/Auth.jsx";
//show big image and some text under it



function Game() {
    const [game, setGame] = useState('kpgn');
    const roomId = parseInt(useParams().roomId);
    console.log(roomId);
    const { getJwtToken } = useAuth();
    const [backendMessages, setBackendMessages] = useState([]);


    useEffect(() => {
        SignalRService.startConnection(roomId, getJwtToken());

        SignalRService.onMessageReceived((receivedMessage) => {
            setBackendMessages(prevMessages => [...prevMessages, receivedMessage]);
        });
        return () => {
            SignalRService.stopConnection();
        };
    }, [roomId]);


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
                    <GameChat
                        connection={SignalRService.connection}
                        backendMessages={backendMessages}
                    />


                </div>
            </div>
        </>
    );
}

export default Game;