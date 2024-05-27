import styles from "./Rooms.module.css";
import {Helmet} from "react-helmet-async";
import RoomElement from "@/Components/RoomElement/RoomElement.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "@/Components/Auth/Auth.jsx";

function Rooms() {
    const { getJwtToken } = useAuth();



    const [rooms, setRooms] = useState([]);

    const getRoomsFromApi = async () => {
        const response = await fetch('/api/GamingRooms', {
            headers: {
                'Authorization': `Bearer ${getJwtToken()}`
            }
        });
        const data = await response.json();

        setRooms(data.gamingRooms);
        console.log(data.gamingRooms);
    }

    const createRoomInApi = async () => {
        const response = await fetch('/api/GamingRooms', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getJwtToken()}`,
                'Content-Type': 'application/json' // Dodanie tego nagłówka
            },
            body: JSON.stringify({
                "game": "Little Peter"
            })
        });
        const data = await response.json();
        getRoomsFromApi();
    }


    useEffect(() => {
        getRoomsFromApi()
    }, []);

    const roomsCustom = [
        {
            id: 100,
            gameName: 'Papier kamień nożyce',
            numbersPersons: 1,
            maxPersons: 2,
        },
        {
            id: 101,
            gameName: 'Warcaby',
            numbersPersons: 1,
            maxPersons: 2,
        }, {
            id: 102,
            gameName: 'Piotruś',
            numbersPersons: 1,
            maxPersons: 2,
        }, {
            id: 103,
            gameName: 'Papier kamień nożyce',
            numbersPersons: 1,
            maxPersons: 2,
        }, {
            id: 104,
            gameName: 'Papier kamień nożyce',
            numbersPersons: 1,
            maxPersons: 2,
        }, {
            id: 105,
            gameName: 'Papier kamień nożyce',
            numbersPersons: 2,
            maxPersons: 2,
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
                            <button onClick={createRoomInApi} className={styles.addRoomButton}>
                                STWÓRZ POKÓJ
                            </button>
                        </div>
                    </div>
                    <div className={styles.border}></div>
                    <div className={styles.roomsContainer}>
                        {rooms.map((room, index) => {
                            return (
                                <RoomElement room={room} key={index} />
                            )
                        })}

                        {roomsCustom.map((room, index) => {
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