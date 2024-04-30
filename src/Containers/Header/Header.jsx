import styles from "@/Containers/Header/Header.module.css";
import {Link} from "react-router-dom";


function Header() {

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerLeft}>
                        <div className={styles.logoWrapper}>
                            <Link to={'/'} className={styles.logo}></Link>
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.rightContainer}>
                            <Link to={'/logowanie'} className={styles.rightText}>Zaloguj się / Załóż konto</Link>
                            <div className={styles.rightImage}></div>
                        {/*<Link to={'/login'} className={styles.headerItem}>Login</Link>*/}
                        {/*<Link to={'/register'} className={styles.headerItem}>Register</Link>*/}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header