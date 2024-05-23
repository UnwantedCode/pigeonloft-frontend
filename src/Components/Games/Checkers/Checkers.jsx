import {Helmet} from "react-helmet-async";
import styles from "./Checkers.module.css";
import {useEffect, useState} from "react"; // Import zdjęcia skały


import whitePiece from '@/assets/images/games/checkers/white.svg';
import blackPiece from '@/assets/images/games/checkers/black.svg';

function Checkers() {
    const [board, setBoard] = useState(Array(64).fill(null).map((_, i) => {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const isPiece = y <= 2 || y >= 5;
        const isWhitePiece = y >= 5;
        if (isPiece && (x + y) % 2 === 1) {
            return isWhitePiece ? 'white' : 'black';
        }
        return null;
    }));

    const [draggingPiece, setDraggingPiece] = useState(null);

    const handleDragStart = (piece, index) => {
        setDraggingPiece({ piece, index });
    };

    const handleDragOver = (e, index) => {
        if ((index + Math.floor(index / 8)) % 2 === 1 && !board[index]) {
            e.preventDefault();
        }
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        if ((index + Math.floor(index / 8)) % 2 === 1 && !board[index]) {
            const newBoard = [...board];
            newBoard[draggingPiece.index] = null;
            newBoard[index] = draggingPiece.piece;
            setBoard(newBoard);
        }
        setDraggingPiece(null);
    };

    const handleDragEnd = () => {
        setDraggingPiece(null);
    };

    const renderSquare = (i) => {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const isDark = (x + y) % 2 === 1;
        const piece = board[i];

        return (
            <div
                key={i}
                className={`${styles.square} ${isDark ? styles.dark : styles.light} ${styles[`square${i}`]}`}
                onDragOver={(e) => handleDragOver(e, i)}
                onDrop={(e) => handleDrop(e, i)}
            >
                {piece && (
                    <img
                        src={piece === 'white' ? whitePiece : blackPiece}
                        alt={piece === 'white' ? 'White Piece' : 'Black Piece'}
                        className={styles.piece}
                        draggable
                        onDragStart={() => handleDragStart(piece, i)}
                        onDragEnd={handleDragEnd}
                        style={{ opacity: draggingPiece && draggingPiece.index === i ? 0 : 1 }}
                    />
                )}
            </div>
        );
    };

    const renderBoard = () => {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(renderSquare(i));
        }
        return squares;
    };

    return (
        <>
            <Helmet>
                <title>Warcaby</title>
            </Helmet>
            <div className={styles.gameWrapper}>
                <div className={styles.top}>
                </div>
                <div className={styles.board}>
                    {renderBoard()}
                </div>

            </div>
        </>
    );
}

export default Checkers;