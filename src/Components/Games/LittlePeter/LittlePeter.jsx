import {Helmet} from "react-helmet-async";
import styles from "./LittlePeter.module.css";
import Card from "@/Components/Games/LittlePeter/Cart/Card.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "@/Components/Auth/Auth.jsx";

function LittlePeter({connection}) {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [gemeState, setGameState] = useState({});
    const { decodeJwtToken } = useAuth();
    const email = decodeJwtToken()["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    console.log(gemeState);
    // cretate connection on ReceiveGameState usin connection.on

    const [enemyCards, setEnemyCards] = useState([]);
    const [myCards, setMyCards] = useState([]);
     const [cardsPlayed, setCardsPlayed] = useState([]);

/*    setEnemyCards([
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
    ]);
    setMyCards([
        { suit: 'spades', rank: 'a' },
        { suit: 'diamonds', rank: '10' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '3' },
        { suit: 'hearts', rank: '2' },
    ]);
    setCardsPlayed([
        { suit: 'hearts', rank: 'q' },
        { suit: 'spades', rank: 'q' },
        { suit: 'others', rank: 'jb' },
        { suit: 'others', rank: 'jr' },
    ]);*/

    useEffect(() => {
        if (connection) {
            connection.on('ReceiveGameState', (gameState) => {
                setGameState(gameState);
            });
        }
    }, [connection]);
    // if gameStarted is true fill myCards with cards
    useEffect(() => {
        if (gemeState.gameStarted) {
            let tmpMyCards = [];
            gemeState.cards.forEach((card, index) => {
                tmpMyCards.push({ suit: 'spades', rank: card });
            });
            setMyCards(tmpMyCards);

            gemeState.opponents.forEach((oponent) => {
                if (oponent.name !== email) {
                    let tmpEnemyCards = [];
                    // oponent.cards is number of cards
                    for (let i = 0; i < oponent.cards; i++) {
                        tmpEnemyCards.push({ suit: 'others', rank: 'back' });
                    }
                    setEnemyCards(tmpEnemyCards);
                }
            });

        }
    } , [gemeState.cards]);

    const offset = 30; // Odległość między kartami
    const middleIndexCardsPlayed = (cardsPlayed.length / 2);
    const middleIndexMyCards = (myCards.length / 2);
    const middleIndexEnemyCards = (enemyCards.length / 2);
    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
    };
    const handleButtonClick = () => {
        if (gemeState.gameStarted == false) {
            connection.invoke('StartGame');
            console.log('StartGame');
            setSelectedCardIndex(null);
        }
        if (gemeState.gameStarted == true) {
            if (gemeState.whoseTurn === email && selectedCardIndex !== null) {
                connection.invoke('SendCommand', 'ChooseCard', selectedCardIndex.toString())
                setSelectedCardIndex(null);
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>Piotruś</title>
            </Helmet>
            <div className={styles.gameWrapper}>
                <div className={styles.enemyDeck}>
                    {enemyCards.map((card, index) => (
                        <div
                            key={index}
                            className={`${styles.card} ${selectedCardIndex === index ? styles.selected : ''}`}
                            onClick={() => handleCardClick(index)}
                            style={{transform: `translateX(${(index - middleIndexEnemyCards) * offset}px)`}}
                        >
                            <Card suit={card.suit} rank={card.rank}/>
                        </div>
                    ))}
                </div>

                <div className={styles.playArea}>
                    {cardsPlayed.map((card, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            style={{transform: `translateX(${(index - middleIndexCardsPlayed) * offset}px)`}}
                        >
                            <Card suit={card.suit} rank={card.rank}/>
                        </div>
                    ))}
                </div>
                <div className={styles.bottomArea}>
                    <button
                        onClick={() => handleButtonClick()}
                        className={styles.button}>
                        {gemeState.gameStarted ? 'DOBIERZ' : 'ROZPOCZNIJ'}
                        </button>
                    <div className={styles.myDeck}>
                        {myCards.map((card, index) => (
                            <div
                                key={index}
                                className={styles.card}
                                style={{transform: `translateX(${(index - middleIndexMyCards) * offset}px)`}}
                            >
                                <Card suit={card.suit} rank={card.rank}/>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}

export default LittlePeter;
