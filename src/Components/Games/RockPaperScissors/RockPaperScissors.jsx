import {Helmet} from "react-helmet-async";
import styles from "./RockPaperScissors.module.css";

import rockImage from '@/assets/images/games/rock_paper_scissors/rock.png'; // Import zdjęcia skały
import paperImage from '@/assets/images/games/rock_paper_scissors/paper.png'; // Import zdjęcia skały
import scissorsImage from '@/assets/images/games/rock_paper_scissors/scissors.png';
import {useEffect, useState} from "react"; // Import zdjęcia skały
import {useAuth} from "@/Components/Auth/Auth.jsx";

function RockPaperScissors({connection}) {

    const [myChoice, setMyChoice] = useState(null);
    const [gameState, setGameState] = useState({});
    const [enemyChoice, setEnemyChoice] = useState(null);
    const [result, setResult] = useState('Wybierz i zakończ turę!');
    const [myScore, setMyScore] = useState(0);
    const [enemyScore, setEnemyScore] = useState(0);
    const [countdown, setCountdown] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [turnEnded, setTurnEnded] = useState(false);
    const [showPopup, setShowPopup] = useState(true);
    const { decodeJwtToken } = useAuth();
    const email = decodeJwtToken()["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const [text, setText] = useState('');

    const choices = [
        { name: 'paper', image: paperImage },
        { name: 'rock', image: rockImage },
        { name: 'scissors', image: scissorsImage },
    ];

    useEffect(() => {
        if (connection) {
            connection.on('ReceiveGameState', (gameState) => {
                setGameState(gameState);
                console.log('Game state1:',gameState);
                if(gameState.phase == "GameStonePaperScissorsStateFinished")
                    {
                        var enemyChoice;
                        var myChoice;
                        gameState.opponents.forEach((oponent) => {
                            if (oponent.name !== email) {
                                enemyChoice = oponent.move;
                            }
                            else 
                            {
                                myChoice = oponent.move;
                            }
                        })
                        if(enemyChoice === "Paper") setEnemyChoice(choices[0]);
                        if(enemyChoice === "Stone") setEnemyChoice(choices[1]);
                        if(enemyChoice === "Scissors") setEnemyChoice(choices[2]);

                        console.log("EnymyChoice",enemyChoice);
                        console.log("MyChoice",myChoice);
                        determineWinner(myChoice,enemyChoice);
                        console.log('Finished');
                    }
            });
        }
        console.log('No connection');
    }, [connection]);

    const startGame = () => {
        console.log("Klikam start")
        if (gameState.gameStarted == false) {
            setGameStarted(true);
            gameState.opponents.forEach((oponent) => {
                if (oponent.name === email) {
                    if (oponent.started === false) {
                        connection.invoke('StartGame');
                        setEnemyChoice(0);
                        setText('Oczekiwanie na ropoczęcie gry przez przeciwnika');
                        console.log('StartGame');
                    }
                }
            })
        }
    };

    const endTurn = () => {
        if (gameState.gameStarted == true) {
            if (myChoice !== null) {
                let selectedMove = myChoice.name;
                connection.invoke('SendCommand', 'ChooseMove', selectedMove.toString())
            }
        }
        setGameStarted(false);
    };

    const handleClick = (choice) => {
        setMyChoice(choice);
    };

    const determineWinner = (myChoice, enemyChoice) => {
        
        if (myChoice === enemyChoice) {
            setText('Remis');
        } else if (
            (myChoice === 'Stone' && enemyChoice === 'Scissors') ||
            (myChoice === 'Paper' && enemyChoice === 'Stone') ||
            (myChoice === 'Scissors' && enemyChoice === 'Paper')
        ) {
            setText('Zdobywasz punkt!');
            setMyScore(prevScore => {
                const newScore = prevScore + 1;
                if (newScore === 5) {
                    setText('WYGRAŁEŚ!!!');
                    endGame();
                }
                return newScore;
            });
        } else {
            setText('Przeciwnik zdobywa punkt!');
            setEnemyScore(prevScore => {
                const newScore = prevScore + 1;
                if (newScore === 5) {
                    setText('PRZEGRAŁEŚ!!!');
                    endGame();
                }
                return newScore;
            });
        }
        
        console.log("MyScore", myScore);
        console.log("EnemyScore", enemyScore);
    };
    

    const resetGame = () => {
        setMyChoice(null);
        setEnemyChoice(null);
        setText('Wybierz i zakończ turę!');
        setCountdown(null);
    };

    const endGame = () => {
        setMyChoice(null);
        setEnemyChoice(null);
        setText('Wybierz i zakończ turę!');
        setCountdown(null);
        setMyScore(0);
        setEnemyScore(0);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handlePopupClick = (e) => {
        if (e.target === e.currentTarget) {
            closePopup();
        }
    };

    useEffect(() => {
        if (gameState.gameStarted) {
            setText('Gra rozpoczęta');
        } else {
            if (gameState.opponents && gameState.opponents.length === 1)
            {
                setText('Czekaj na przeciwnika');
            } 
            else if(gameState.phase !== "GameStonePaperScissorsStateFinished"){
                console.log('Game state1a:',gameState);
                setText('Gra jest gotowa do rozpoczęcia');
                if (gameState.opponents && gameState.opponents.length === 2) {
                    gameState.opponents.forEach((oponent) => {
                        if (oponent.name !== email) {
                            oponent.started === true ? setText('Przeciwnik rozpoczął grę. Teraz ty powinieneś :)') : setText('Czekaj, aż przeciwnik rozpocznie grę');
                        }
                    });
                }

            }
        }
    }, [gameState.gameStarted, gameState.opponents]);

    useEffect(() => {
        setShowPopup(true);
    }, []);

    return (
        <>
            <Helmet>
                <title>KPN</title>
            </Helmet>
            {showPopup && (
                <div className={styles.popupOverlay} onClick={handlePopupClick}>
                    <div className={styles.popup}>
                        <button className={styles.closeButton} onClick={closePopup}>✖</button>
                        <h2>Zasady gry</h2>
                        <p>W grze "papier, kamień, nożyce"...</p>
                        <p>Papier pokonuje kamień, kamień pokonuje nożyce, a nożyce pokonują papier.</p>
                        <p>Zdobądź 5 punktów i WYGRAJ!!!</p>
                    </div>
                </div>
            )}
            <div className={styles.gameWrapper}>
                {text !== '' && <div className={styles.text}>{text}</div>}
                <div className={styles.top}>
                    <div id={styles.scoreContainer} className={styles.scoreContainer}>
                        <div className={styles.score + ' ' + styles.myScore}>{myScore}</div>
                        <div className={styles.score + ' ' + styles.enemyScore}>{enemyScore}</div>
                    </div>
                    <div className={styles.score + ' ' + styles.result}>{gameState.className}</div>

                </div>
                <div className={styles.middle}>
                    <div className={styles.table}>
                        <div className={styles.myContainer}>
                            {/*<img src={scissorsImage} alt=""/>*/}
                            {myChoice ? <img src={myChoice.image} alt={myChoice.name}/> :
                                <div className={styles.text}>?</div>}
                        </div>
                        <div className={styles.enemyContainer}>
                            {enemyChoice ? <img src={enemyChoice.image} alt={enemyChoice.name}/> :
                                <div className={styles.text}>?</div>}
                        </div>
                        {/*                    <div className={styles.enemyContainer}>
                        <div className={styles.text}>?</div>
                    </div>*/}
                        {/*                        <div className={styles.blankContainer}>
                            <div className={styles.text}>?</div>
                        </div>*/}
                    </div>
                    <div className={styles.buttonContainer}>
                        {!gameStarted && gameState.phase === "GameStonePaperScissorsStateWaitingForPlayers" && (
                            <button className={styles.button} onClick={startGame}>START</button>
                        )}
                        {!gameStarted && gameState.phase === "GameStonePaperScissorsStateFinished" && (
                            <button className={styles.button} onClick={startGame} >NOWA GRA</button>
                        )}
                        {gameStarted && gameState.phase === "GameStonePaperScissorsStateWaitingForPlayers" && (
                            <button className={styles.button} style={{ height: "190px", marginBottom: "20px" }} >Oczekiwanie na rozpoczęcie gry przez wszystkich graczy</button>
                        )}
                        {gameStarted && gameState.phase === "GameStonePaperScissorsStatePlaying" && (
                            <button className={styles.button} onClick={endTurn} disabled={!myChoice}>PRZEŚLIJ WYBÓR</button>
                        )}
                        {!gameStarted && gameState.phase === "GameStonePaperScissorsStatePlaying" && (
                            <button className={styles.button} style={{ height: "190px", marginBottom: "20px"}}>OCZEKIWANIE NA RUCH PRZECIWNIKA</button>
                        )}
                    </div>

                </div>
                <div className={styles.bottom}>
                    <div className={styles.buttonContainer}>
                        {choices.map(choice => (
                            <button key={choice.name} className={styles.button} onClick={() => handleClick(choice)}>
                                <img src={choice.image} alt={choice.name}/>
                            </button>
                        ))}
                    </div>

                </div>


            </div>
        </>
    );
}

export default RockPaperScissors;