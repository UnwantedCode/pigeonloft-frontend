import React from "react";
import styles from "./RoomElement.module.css";
import {Link} from "react-router-dom";

function RoomElement(props) {
    const translation = {
        "Little Peter": "Piotruś",
        "Paper Rock Scissors": "Papier kamień nożyce",
        "Checkers": "Warcaby"
    }
    if (props.room === undefined) {
        return null;
    }
    const { room } = props;
    room.maxPersons = room.maxPersons || 2;
    room.numbersPersons = room.numbersPersons || 0;

    let roomElementStyle = `${styles.roomElement} ${room.numbersPersons === room.maxPersons ? styles.full : styles.notFull}`;
    let gamePath = "";
    if (room.gameName === "Little Peter") {
        gamePath = '/gra/piotrus';
    }
    if (room.gameName === "Paper Rock Scissors") {
        gamePath = '/gra/kpn';
    }
    if (room.gameName === "Checkers") {
        gamePath = '/gra/warcaby';
    }
    const gameNameTranslated = translation[room.gameName] || room.gameName;
    const roomUrl = `${gamePath}/${room.id}`;

    return (
        <>
            <div className={roomElementStyle}>
                <div className={styles.left}>
                    <div className={styles.index}>#{props.room.id}</div>
                    <div className={styles.name}>{gameNameTranslated}</div>
                </div>
                <div className={styles.right}>
                    <div className={styles.numbersPersons}>{room.numbersPersons}/{room.maxPersons}</div>
                    <Link to={roomUrl} className={styles.button}>
                        DOŁĄCZ
                    </Link>
                </div>

            </div>

        </>
    );
}

export default React.memo(RoomElement)