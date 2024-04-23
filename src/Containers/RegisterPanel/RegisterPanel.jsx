import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {Link, Navigate, redirect} from "react-router-dom";
import {Helmet} from "react-helmet";
import styles from './RegisterPanel.module.css'

function RegisterPanel() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const jwtCookieName = "jwtToken";
    const [cookie, setCookie] = useCookies([jwtCookieName]);
    // redirect to home page if user is logged in
    if (cookie.jwtToken) {
        return <Navigate to="/" replace />;
    }



    const handleRegister = (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        // if email is not valid
        if (!email.includes("@")) {
            setError("Email is not valid");
            return;
        }
        // if password and confirm password do not match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        // fetch email and password and get token
        fetch("/api/Accounts", {
            method: "POST",
            body: JSON.stringify({email, password, confirmPassword}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Register failed");
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                setError(error.message);
            });

    };
    return (
        <>
            <Helmet>
                <title>Rejestracja</title>
            </Helmet>
            <div className={styles.background}>
                <div className={styles.registerPanel}>
                    <h1 className={styles.registerPanelTitle}>Rejestracja</h1>
                    <form className={styles.registerPanelForm} onSubmit={handleRegister}>
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
                        <label className={styles.inputWraper}>
                            <p className={styles.inputTitle}>
                                Powtórz hasło
                            </p>
                            <input
                                className={styles.input}
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                        <button className={styles.registerPanelButton} type="submit">Zarejestruj</button>
                    </form>

                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    );
}

export default RegisterPanel;