import styles from './Menu.module.css'
import {Link} from "react-router-dom";

function Menu() {
    return (
        <div className={styles.menu}>
            <div className={styles.menuContainer}>
                <div className={styles.menuLeft}>
                    <div className={styles.logoWrapper}>
                        <Link to={'/'} className={styles.logo}></Link>
                    </div>
                </div>
                <div className={styles.menuRight}>
                    <Link to={'/login'} className={styles.menuItem}>Login</Link>
                    <Link to={'/register'} className={styles.menuItem}>Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Menu;