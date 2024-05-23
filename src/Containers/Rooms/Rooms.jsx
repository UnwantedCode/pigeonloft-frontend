import styles from "./Rooms.module.css";
import {Helmet} from "react-helmet-async";
import RoomElement from "@/Components/RoomElement/RoomElement.jsx";

function Rooms() {

    const rooms = [
        {
            id: 100,
            name: 'Papier kamień nożyce',
            numbersPersons: 1,
            maxPersons: 2,
            url: '/gra/kpn'
        },
        {
            id: 101,
            name: 'Warcaby',
            numbersPersons: 1,
            maxPersons: 2,
            url: '/gra/warcaby'
        }, {
            id: 102,
            name: 'Piotruś',
            numbersPersons: 1,
            maxPersons: 2,
            url: '/gra/piotrus'
        }, {
            id: 103,
            name: 'Papier kamień nożyce',
            numbersPersons: 1,
            maxPersons: 2,
            url: '/gra/kpn'
        }, {
            id: 104,
            name: 'Papier kamień nożyce',
            numbersPersons: 1,
            maxPersons: 2,
            url: '/gra/kpn'
        }, {
            id: 105,
            name: 'Papier kamień nożyce',
            numbersPersons: 2,
            maxPersons: 2,
            url: '/gra/kpn'
        }
    ];


    return (
        <>
            <Helmet>
                <title>Lista pokoi</title>
            </Helmet>
            <div id={styles.appContent}>
                <div className={styles.mainPageContainer}>
                    <div className={styles.topContainer}>
                        <p className={styles.title}>
                            LISTA POKOI
                        </p>
                        <div className={styles.addRoomContainer}>
                            <a href="/rooms/new" className={styles.addRoomButton}>
                                STWÓRZ POKÓJ
                            </a>
                        </div>
                    </div>
                    <div className={styles.border}></div>
                    <div className={styles.roomsContainer}>
                        {rooms.map((room, index) => {
                            return (
                                <RoomElement room={room} key={index} />
                            )
                        })}

                    </div>


                </div>
            </div>
        </>
    );
}

export default Rooms;