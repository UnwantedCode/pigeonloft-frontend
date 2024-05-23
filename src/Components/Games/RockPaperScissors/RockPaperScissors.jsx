import {Helmet} from "react-helmet-async";
import styles from "./RockPaperScissors.module.css";

function RockPaperScissors() {
    return (
        <>
            <Helmet>
                <title>KPN</title>
            </Helmet>
            <div className={styles.gameWraper}></div>


        </>
    );
}

export default RockPaperScissors;