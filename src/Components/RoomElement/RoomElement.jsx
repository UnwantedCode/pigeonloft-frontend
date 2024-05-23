import React from "react";
import styles from "./RoomElement.module.css";
import {Link} from "react-router-dom";

function RoomElement(props) {
    console.log(props)

    let roomElementStyle = styles.roomElement;
    props.room.numbersPersons === props.room.maxPersons ? roomElementStyle += ' ' + styles.full : roomElementStyle += ' ' + styles.notFull;

    return (
        <>
            <div className={roomElementStyle}>
                <div className={styles.left}>
                    <div className={styles.index}>#{props.room.id}</div>
                    <div className={styles.name}>{props.room.name}</div>
                </div>
                <div className={styles.right}>
                    <div className={styles.numbersPersons}>{props.room.numbersPersons}/{props.room.maxPersons}</div>

                    <Link to={props.room.url} className={styles.button}>
                        DOŁĄCZ
                    </Link>
                </div>

            </div>

        </>
    );
}

export default React.memo(RoomElement)