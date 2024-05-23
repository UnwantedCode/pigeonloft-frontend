import {Helmet} from "react-helmet-async";
import styles from "./RockPaperScissors.module.css";

import rockImage from '@/assets/images/games/rock_paper_scissors/rock.png'; // Import zdjęcia skały
import paperImage from '@/assets/images/games/rock_paper_scissors/paper.png'; // Import zdjęcia skały
import scissorsImage from '@/assets/images/games/rock_paper_scissors/scissors.png';
import {useState} from "react"; // Import zdjęcia skały
function RockPaperScissors() {

    const [myChoice, setMyChoice] = useState(null);
    const [enemyChoice, setEnemyChoice] = useState(null);
    const [result, setResult] = useState('Wybierz i zakończ turę!');
    const [myScore, setMyScore] = useState(0);
    const [enemyScore, setEnemyScore] = useState(0);
    const [countdown, setCountdown] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [turnEnded, setTurnEnded] = useState(false);

    const choices = [
        { name: 'paper', image: paperImage },
        { name: 'rock', image: rockImage },
        { name: 'scissors', image: scissorsImage },
    ];

    const startGame = () => {
        setGameStarted(true);
        setTurnEnded(false);
        resetGame();
    };

    const endTurn = () => {
        const enemyChoice = choices[Math.floor(Math.random() * choices.length)];
        setEnemyChoice(enemyChoice);
        setCountdown(3); // Start odliczania od 3

        const countdownInterval = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 1) {
                    clearInterval(countdownInterval);
                    determineWinner(myChoice, enemyChoice);
                    setGameStarted(false);
                    setTurnEnded(false);
                    return null;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    const handleClick = (choice) => {
        setMyChoice(choice);
    };

    const determineWinner = (myChoice, enemyChoice) => {
        if (myChoice.name === enemyChoice.name) {
            setResult('Remis');
        } else if (
            (myChoice.name === 'rock' && enemyChoice.name === 'scissors') ||
            (myChoice.name === 'paper' && enemyChoice.name === 'rock') ||
            (myChoice.name === 'scissors' && enemyChoice.name === 'paper')
        ) {
            setResult('Zdobywasz punkt!');
            setMyScore(myScore + 1);
        } else {
            setResult('Przeciwnik zdobywa punkt!');
            setEnemyScore(enemyScore + 1);
        }
    };

    const resetGame = () => {
        setMyChoice(null);
        setEnemyChoice(null);
        setResult('Wybierz i zakończ turę!');
        setCountdown(null);
    };

    return (
        <>
            <Helmet>
                <title>KPN</title>
            </Helmet>
            <div className={styles.gameWrapper}>
                <div className={styles.top}>
                    <div id={styles.scoreContainer} className={styles.scoreContainer}>
                        <div className={styles.score + ' ' + styles.myScore}>{myScore}</div>
                        <div className={styles.score + ' ' + styles.enemyScore}>{enemyScore}</div>
                    </div>
                    <div className={styles.score + ' ' + styles.result}>{result}</div>

                </div>
                <div className={styles.middle}>
                    <div className={styles.table}>
                        <div className={styles.myContainer}>
                            {/*<img src={scissorsImage} alt=""/>*/}
                            {myChoice ? <img src={myChoice.image} alt={myChoice.name}/> :
                                <div className={styles.text}>?</div>}
                        </div>
                        <div className={styles.enemyContainer}>
                            {enemyChoice && countdown === null ? <img src={enemyChoice.image} alt={enemyChoice.name}/> :
                                <div className={styles.text}>{countdown !== null ? countdown : '?'}</div>}
                        </div>
                        {/*                    <div className={styles.enemyContainer}>
                        <div className={styles.text}>?</div>
                    </div>*/}
                        {/*                        <div className={styles.blankContainer}>
                            <div className={styles.text}>?</div>
                        </div>*/}
                    </div>
                    <div className={styles.buttonContainer}>
                        {!gameStarted && (
                            <button className={styles.button} onClick={startGame}>START</button>
                        )}
                        {gameStarted && !turnEnded && (
                            <button className={styles.button} onClick={endTurn} disabled={!myChoice}>ZAKOŃCZ
                                TURĘ</button>
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