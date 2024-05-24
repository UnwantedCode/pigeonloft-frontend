import {Helmet} from "react-helmet-async";
import styles from "./LittlePeter.module.css";
import Card from "@/Components/Games/LittlePeter/Cart/Card.jsx";

function LittlePeter() {
    const myCards = [
        { suit: 'spades', rank: 'a' },
        { suit: 'diamonds', rank: '10' },
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
        { suit: 'others', rank: 'jb' },
        { suit: 'others', rank: 'jr' },
        { suit: 'hearts', rank: 'q' },
        { suit: 'spades', rank: 'q' },
        { suit: 'others', rank: 'jb' },
        { suit: 'others', rank: 'jr' },
    ];


    const offset = 30; // Odległość między kartami
    const middleIndexCardsPlayed = Math.floor(cardsPlayed.length / 2);
    const middleIndexMyCards = Math.floor(myCards.length / 2);

    return (
        <>
            <Helmet>
                <title>Piotruś</title>
            </Helmet>
            <div className={styles.gameWrapper}>
                <div className={styles.enemyDeck}>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className={styles.cardBack}>

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