import {Helmet} from "react-helmet-async";
import styles from "./LittlePeter.module.css";
import Card from "@/Components/Games/LittlePeter/Cart/Card.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "@/Components/Auth/Auth.jsx";

function LittlePeter({connection}) {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [gameState, setGameState] = useState({});
    const { decodeJwtToken } = useAuth();
    const email = decodeJwtToken()["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    console.log(gameState);
    const [text, setText] = useState('');
    // cretate connection on ReceivegameStateusin connection.on

    const [enemyCards, setEnemyCards] = useState([]);
    const [myCards, setMyCards] = useState([]);
     const [cardsPlayed, setCardsPlayed] = useState([]);

    useEffect(() => {
        if (connection) {
            connection.on('ReceiveGameState', (gameState) => {
                setGameState(gameState);
            });
        }
    }, [connection]);
    // if gameStarted is true fill myCards with cards
    useEffect(() => {
        if (gameState.gameStarted) {
            let tmpMyCards = [];
            gameState.cards.forEach((card, index) => {
                tmpMyCards.push({ suit: 'spades', rank: card });
            });
            setMyCards(tmpMyCards);

            setCardsPlayed([]);

            gameState.opponents.forEach((oponent) => {
                if (oponent.name !== email) {
                    let tmpEnemyCards = [];
                    // oponent.cards is number of cards
                    for (let i = 0; i < oponent.cards; i++) {
                        tmpEnemyCards.push({ suit: 'others', rank: 'back' });
                    }
                    setEnemyCards(tmpEnemyCards);
                }
                oponent.pairs.forEach((pair) => {
                    setCardsPlayed(prevState => [...prevState, { suit: 'spades', rank: pair }]);
                })

            });

        }
    } , [gameState.cards]);

    useEffect(() => {
        if (gameState.gameStarted) {
            setText('Gra rozpoczęta');
        } else {
            if (gameState.opponents && gameState.opponents.length === 1)
            {
                setText('Czekaj na przeciwnika');
            } else {
                setText('Gra jest gotowa do rozpoczęcia');
                if (gameState.opponents && gameState.opponents.length === 2) {
                    gameState.opponents.forEach((oponent) => {
                        if (oponent.name !== email) {
                            oponent.started === true ? setText('Przeciwnik rozpoczął grę. Teraz ty powinieneś :)') : setText('Czekaj, aż przeciwnik rozpocznie grę');
                        }
                    });
                }

            }
            resetGame();
        }

        if (gameState.gameStarted && gameState.whoseTurn === email) {
            setText('Twój ruch');
        }
        if (gameState.gameStarted && gameState.whoseTurn !== email) {
            setText('Ruch przeciwnika');
        }
    }, [gameState.gameStarted, gameState.opponents]);

    const offset = 30; // Odległość między kartami
    const middleIndexCardsPlayed = (cardsPlayed.length / 2);
    const middleIndexMyCards = (myCards.length / 2);
    const middleIndexEnemyCards = (enemyCards.length / 2);
    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
    };
    const handleButtonClick = () => {
        if (gameState.gameStarted == false) {
            gameState.opponents.forEach((oponent) => {
                if (oponent.name === email) {
                    if (oponent.started === false) {
                        connection.invoke('StartGame');
                        console.log('StartGame');
                    }
                }
            })

            setSelectedCardIndex(null);
        }
        if (gameState.gameStarted == true) {
            if (gameState.whoseTurn === email && selectedCardIndex !== null) {
                let selectedCard = selectedCardIndex +1;
                connection.invoke('SendCommand', 'ChooseCard', selectedCard.toString())
                setSelectedCardIndex(null);
            }
        }
    }

    useEffect(() => {
        if (gameState&& gameState.phase === 'GameLittlePeterStateFinished') {
            resetGame();
            if (gameState.cards.length === 0) {
                setText('Wygrałeś');
            } else {
                setText('Przegrałeś');
            }
        }
    }, [gameState]);



    function resetGame() {
        setEnemyCards([]);
        setMyCards([]);
        setCardsPlayed([]);
    }

    return (
        <>
            <Helmet>
                <title>Piotruś</title>
            </Helmet>
            <div className={styles.gameWrapper}>
                <div className={styles.top}>
                {text !== '' && <div className={styles.text}>{text}</div>}

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
                        {gameState.gameStarted ? 'DOBIERZ' : 'ROZPOCZNIJ'}
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
