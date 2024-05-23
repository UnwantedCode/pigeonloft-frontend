import React, {useEffect, useRef, useState} from "react";
import styles from "./GameChat.module.css";

function GameChat(props) {

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const handleInputChange = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto'; // Resetuje wysokość
        textarea.style.height = `${textarea.scrollHeight}px`; // Ustawia wysokość na podstawie zawartości
        setText(event.target.value);
    };

    const handleSendMessage = () => {
        if (text.trim()) {
            // rand type
            const type = Math.random() > 0.5 ? 'my' : 'enemy';

            setMessages([...messages, { text, type: type }]);
            setText('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <>
            <div className={styles.chat}>
                <div className={styles.chatHeader}>
                    <div className={styles.chatHeaderLeft}>
                        <div className={styles.chatHeaderText}>Użytkownik 1</div>
                    </div>
                    <div className={styles.chatHeaderRight}>
                        <div className={styles.chatHeaderText}>Przeciwnik</div>
                    </div>
                </div>
                <div className={styles.chatContent}>
                    <div className={styles.chatMessages}>
                        {/*                        <div className={styles.chatMessageMy}>
                            <div className={styles.chatMessageText}>Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                            </div>
                        </div>
                        <div className={styles.chatMessageEnemy}>
                            <div className={styles.chatMessageText}>Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                            </div>
                        </div>*/}
                        {messages.map((message, index) => (
                            <div key={index}
                                 className={message.type === 'my' ? styles.chatMessageMy : styles.chatMessageEnemy}>
                                <div className={styles.chatMessageText}>{message.text}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}/>
                    </div>
                    <div className={styles.chatInput}>
                        <textarea
                            className={styles.chatInputText}
                            placeholder="Napisz wiadomość..."
                            value={text}
                            onChange={handleInputChange}
                            onKeyUp={handleKeyPress}
                        />
                        <div className={styles.chatInputButton} onClick={handleSendMessage}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.8888 5.83355C20.3501 4.74619 19.2538 3.64989 18.1664 4.1112L4.80065 9.78153C3.68469 10.255 3.75086 11.8584 4.90202 12.2383L9.58127 13.7825C9.88218 13.8818 10.1182 14.1178 10.2175 14.4187L11.7617 19.098C12.1416 20.2491 13.745 20.3153 14.2185 19.1993L19.8888 5.83355ZM17.3853 2.27003C20.1282 1.1064 22.8936 3.8718 21.7299 6.61465L16.0596 19.9804C14.8654 22.7954 10.8207 22.6285 9.86241 19.7247L8.47613 15.5239L4.27527 14.1376C1.37147 13.1793 1.20457 9.1346 4.01955 7.94036L17.3853 2.27003Z"
                                    fill="#050000"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(GameChat)