import React from "react";
import styles from "./RoomElement.module.css";

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
                    <div className={styles.button}>
                        DOŁĄCZ
                        </div>
                </div>

            </div>

        </>
    );
}

export default React.memo(RoomElement)