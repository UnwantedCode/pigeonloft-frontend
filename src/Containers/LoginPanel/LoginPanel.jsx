import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import styles from './LoginPanel.module.css'
import {Helmet} from "react-helmet-async";
import {useAuth} from "@/Components/Auth/Auth.jsx";
function LoginPanel() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { saveJwtToken } = useAuth();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Uzupełnij wszystkie pola");
            return;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setError("Adres email jest nieprawidłowy");
            return;
        }
        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                setError("Błąd logowania");
                throw new Error("Błąd logowania");
            })
            .then((data) => {
                const token = data.token;
                saveJwtToken(token);
                //redirect to main page
                navigate('/'); // Przekierowanie na główną stronę
            })
            .catch((error) => {
                setError('xxxx' +error.message);
            });

    };

    return (
        <>
            <Helmet>
                <title>Logowanie</title>
            </Helmet>
            <div id={styles.appContent}>
                <div className={styles.loginPanel}>
                    <h1 className={styles.loginPanelTitle}>Logowanie</h1>
                    {error && <div className={styles.loginPanelError}>{error}</div>}
                    <form className={styles.loginPanelForm} onSubmit={handleLogin}>
                        <label className={styles.inputWraper}>
                            <p className={styles.inputTitle}>
                                Email
                            </p>
                            <input
                                className={styles.input}
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label className={styles.inputWraper}>
                            <p className={styles.inputTitle}>
                                Hasło
                            </p>
                            <input
                                className={styles.input}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button className={styles.loginPanelButton} type="submit">Zaloguj</button>
                    </form>
                    <div className={styles.loginPanelRegister}>Nie masz konta? <Link to={'/rejestracja'}>Zarejestruj
                        się</Link></div>

                </div>
            </div>
        </>
    );


}

export default LoginPanel;