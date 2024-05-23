import {Helmet} from "react-helmet-async";
import styles from "./LittlePeter.module.css";

function LittlePeter() {

    return (
        <>
            <Helmet>
                <title>Piotruś</title>
            </Helmet>
            <div className={styles.gameWrapper}>
            </div>
        </>
    );
}

export default LittlePeter;