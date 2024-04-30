// create login panel
import {useState} from "react";
import {useCookies} from "react-cookie";
import {Link, Navigate} from "react-router-dom";

import styles from './LoginPanel.module.css'
import {Helmet} from "react-helmet-async";

function LoginPanel() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // set cookie jwt name as varible
    const jwtCookieName = "jwtToken";
    const [cookie, setCookie] = useCookies([jwtCookieName]);
    if (cookie.jwtToken) {
        return <Navigate to="/" replace/>;
    }
    const saveJwtToken = (token) => {
        let tokenValue = 'Bearer ' + token;
        let tokenData = JSON.parse(atob(token.split('.')[1]));
        let expTime = tokenData.exp;
        let maxAge = expTime - Math.floor(Date.now() / 1000);
        setCookie(jwtCookieName, tokenValue, {
            path: "/",
            maxAge: maxAge,
            sameSite: true,
        });
    }


    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are required");
            return;
        }
        // if email is not valid
        if (!email.includes("@")) {
            setError("Email is not valid");
            return;
        }
        // fetch email and password and get token
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
                throw new Error("Login failed");
            })
            .then((data) => {
                const token = data.token;
                saveJwtToken(token);
            })
            .catch((error) => {
                setError(error.message);
            });

    };

    return (
        <>
            <Helmet>
                <title>Logowanie</title>
            </Helmet>
            <div className={styles.background}>
                <div className={styles.loginPanel}>
                    <h1 className={styles.loginPanelTitle}>Logowanie</h1>
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
                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    );


}

export default LoginPanel;