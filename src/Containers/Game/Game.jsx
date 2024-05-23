import styles from "./Game.module.css";
import {Helmet} from "react-helmet-async";
import GameChat from "@/Components/GameChat/GameChat.jsx";
import RockPaperScissors from "@/Components/Games/RockPaperScissors/RockPaperScissors.jsx";
import {useLocation} from "react-router-dom";
import Checkers from "@/Components/Games/Checkers/Checkers.jsx";
import LittlePeter from "@/Components/Games/LittlePeter/LittlePeter.jsx";
//show big image and some text under it



function Game() {

    const location = useLocation();
    console.log(location);
    //get last part of url
    const game = location.pathname.split('/').pop();
    console.log(game);




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