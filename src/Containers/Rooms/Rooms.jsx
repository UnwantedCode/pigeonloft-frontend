import styles from "./Rooms.module.css";
import { Helmet } from "react-helmet-async";
import RoomElement from "@/Components/RoomElement/RoomElement.jsx";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { useAuth } from "@/Components/Auth/Auth.jsx";

function Rooms() {
    const { getJwtToken } = useAuth();
    const gameName = useParams().gameName;
    const [rooms, setRooms] = useState([]);
    const [selectedGame, setSelectedGame] = useState("Paper Rock Scissors");
    const [isFormVisible, setIsFormVisible] = useState(false);

    const getRoomsFromApi = async (gameName) => {
        console.log("TUTAJ",encodeURIComponent(gameName));
        const response = await fetch(`/api/GamingRooms?gameName=${encodeURIComponent(gameName)}`, {
            headers: {
                'Authorization': `Bearer ${getJwtToken()}`
            }
        });
        const data = await response.json();
        setRooms(data.gamingRooms);
    }

    const createRoomInApi = async () => {
        const response = await fetch(`/api/GamingRooms`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getJwtToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game": selectedGame
            })
        });
        await response.json();
        getRoomsFromApi(gameName);
        setIsFormVisible(false); // Hide the form after creating a room
    }

    useEffect(() => {
        console.log(gameName);
        getRoomsFromApi(gameName);
    }, [gameName]);

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
                            <button 
                                onClick={() => setIsFormVisible(true)} 
                                className={styles.addRoomButton}
                            >
                                STWÓRZ POKÓJ
                            </button>
                        </div>
                    </div>
                    <div className={styles.border}></div>
                    <div className={styles.roomsContainer}>
                        {rooms.map((room, index) => (
                            <RoomElement room={room} key={index} />
                        ))}
                    </div>
                </div>
            </div>
            {isFormVisible && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Utwórz nowy pokój</h2>
                        <select 
                            value={selectedGame}
                            onChange={(e) => setSelectedGame(e.target.value)}
                            className={styles.gameSelect}
                        >
                            <option value="Paper Rock Scissors">Papier Kamień Nożyce</option>
                            <option value="Little Peter">Mały Piotruś</option>
                        </select>
                        <button onClick={createRoomInApi} className={styles.createRoomButton}>
                            UTWÓRZ
                        </button>
                        <button onClick={() => setIsFormVisible(false)} className={styles.closeButton}>
                            ZAMKNIJ
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Rooms;
