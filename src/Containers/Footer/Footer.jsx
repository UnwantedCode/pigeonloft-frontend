//footer

import {useEffect} from 'react';
import styles from './Footer.module.css'
import {Link} from "react-router-dom";
import {minHeight} from "@/Components/Helpers/Functions.jsx";

function Footer() {

    useEffect(() => {
        minHeight()
    },[])
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.logoWrapper}>
                    <Link to={'/'} className={styles.logo}></Link>
                </div>

                    <span className={styles.text}>
                        Projekt zespołowy. Gołębnik. Wszelkie prawa zastrzeżone. Autorzy projektu: WCY21IJ1N1. 2024
                        {/*Karczewski Paweł, Pasek Łukasz, Węgrzyk Julia , Pachnowski Marcin, Tarkowski Adam*/}
                    </span>

            </div>
        </footer>
    );
}

export default Footer;