import styles from "./MainPage.module.css";

import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";

//show big image and some text under it
function MainPage() {
    return (
        <>
            <Helmet>
                <title>Strona glówna</title>
            </Helmet>
            <div id={styles.appContent}>
                <div className={styles.mainPageContainer}>
                    <p className={styles.title}>
                        NASZE 3 GRY
                    </p>
                    <div className={styles.gradientWraper}>
                        <div className={styles.gradientContainer}>
                            <Link to={'/pokoje/Little%20Peter'} >
                                <div className={styles.cart + ' ' + styles.peter}>

                                <div className={styles.cartTop}>
                                    <div className={styles.circle}>
                                        <div className={styles.circleImg}></div>
                                    </div>
                                </div>
                                <div className={styles.cartBottom}>
                                    <div className={styles.cartTitle}><b>PIOTRUŚ</b></div>
                                    {/*PIOTRUŚ*/}
                                </div>

                            </div>
                            </Link>
                            <Link to={'/pokoje'} >
                            <div className={styles.cart + ' ' + styles.checkers}>

                                <div className={styles.cartTop}>
                                    <div className={styles.circle}>
                                        <div className={styles.circleImg}></div>
                                    </div>
                                </div>
                                <div className={styles.cartBottom}>
                                    <div className={styles.cartTitle}><b>WARCABY</b></div>
                                </div>
                            </div>
                            </Link>
                            <Link to={'/pokoje/Paper%20Rock%20Scissors'} >
                            <div className={styles.cart + ' ' + styles.rockPaperScissors}>

                                <div className={styles.cartTop}>
                                    <div className={styles.circle}><div className={styles.circleImg}></div></div>
                                </div>
                                <div className={styles.cartBottom}>
                                    <div className={styles.cartTitle}><b>KAMIEŃ</b> PAPIER <b>NOŻYCE</b></div>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.bottomTitle}>NA CO CZEKASZ?
                        <div className={styles.bottomTitleBold}>ZAGRAJ JUŻ TERAZ</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;