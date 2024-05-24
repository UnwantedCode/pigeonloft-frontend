import {Helmet} from "react-helmet-async";
import styles from "./LittlePeter.module.css";
import Card from "@/Components/Games/LittlePeter/Cart/Card.jsx";
import {useState} from "react";

function LittlePeter() {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const enemyCards = [
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
        { suit: 'others', rank: 'back' },
    ];
    const myCards = [
        { suit: 'spades', rank: 'a' },
        { suit: 'diamonds', rank: '10' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '8' },
        { suit: 'spades', rank: '3' },
        { suit: 'hearts', rank: '2' },
    ];
    const cardsPlayed = [
        { suit: 'hearts', rank: 'q' },
        { suit: 'spades', rank: 'q' },
        { suit: 'others', rank: 'jb' },
        { suit: 'others', rank: 'jr' },
        { suit: 'hearts', rank: 'q' },
        { suit: 'spades', rank: 'q' },
        { suit: 'spades', rank: 'q' },
        { suit: 'spades', rank: 'q' },
        { suit: 'others', rank: 'jb' },
        { suit: 'others', rank: 'jr' },
        { suit: 'hearts', rank: 'q' },
        { suit: 'spades', rank: 'q' },
        { suit: 'others', rank: 'jb' },
        { suit: 'others', rank: 'jr' },
    ];


    const offset = 30; // Odległość między kartami
    const middleIndexCardsPlayed = (cardsPlayed.length / 2);
    const middleIndexMyCards = (myCards.length / 2);
    const middleIndexEnemyCards = (enemyCards.length / 2);
    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
    };
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
                    <button className={styles.button}>DOBIERZ</button>
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