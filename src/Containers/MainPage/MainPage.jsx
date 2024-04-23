import styles from "./MainPage.module.css";
import {Helmet} from "react-helmet";

import bigImage from "../../assets/images/main-page-logo.png";

//show big image and some text under it
function MainPage() {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className={styles.mainWrapper}>
                <div className={styles.mainPageContainer}>
                    <p className={styles.title}>
                        NASZE 3 NAJLEPSZE GRY
                    </p>
                    <div className={styles.gradientWraper}>
                        <div className={styles.gradientContainer}>
                            <div className={styles.cart}></div>
                            <div className={styles.cart}></div>
                            <div className={styles.cart}></div>

                        </div>
                    </div>
                    <p className={styles.bottomTitle}>NA CO CZEKASZ?<div className={styles.bottomTitleBold}>ZAGRAJ JUŻ TERAZ</div></p>
                </div>


















            </div>
        </>
    );
}

export default MainPage;