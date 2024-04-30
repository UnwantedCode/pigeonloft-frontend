import styles from "./MainPage.module.css";

import bigImage from "../../assets/images/main-page-logo.png";
import {Helmet} from "react-helmet-async";

//show big image and some text under it
function MainPage() {
    return (
        <>
            <Helmet>
                <title>Strona glówna</title>
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
                    <div className={styles.bottomTitle}>NA CO CZEKASZ?<div className={styles.bottomTitleBold}>ZAGRAJ JUŻ TERAZ</div></div>
                </div>
            </div>
        </>
    );
}

export default MainPage;