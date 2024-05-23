import styles from "./Game.module.css";
import {Helmet} from "react-helmet-async";
import GameChat from "@/Components/GameChat/GameChat.jsx";
import RockPaperScissors from "@/Components/Games/RockPaperScissors/RockPaperScissors.jsx";
//show big image and some text under it
function Game() {
    return (
        <>
            <Helmet>
                <title>Gra</title>
            </Helmet>
            <div id={styles.appContent}>
                <div className={styles.wrapper}>
                    <RockPaperScissors />
                    <GameChat />


                </div>
            </div>
        </>
    );
}

export default Game;