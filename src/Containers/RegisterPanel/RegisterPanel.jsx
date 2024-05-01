import  {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from './RegisterPanel.module.css'
import {Helmet} from "react-helmet-async";

function RegisterPanel() {
    const navigate = useNavigate(); // add this line

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailClass, setEmailClass] = useState(styles.inputWraper);
    const [passwordClass, setPasswordClass] = useState(styles.inputWraper);
    const [confirmPasswordClass, setConfirmPasswordClass] = useState(styles.inputWraper);

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        let passwordLength = 8;

        if (!email || !password || !confirmPassword) {
            //setError("Wszystkie pola są wymagane");
            setEmailClass(styles.inputWraperInvalid);
            setPasswordClass(styles.inputWraperInvalid);
            setConfirmPasswordClass(styles.inputWraperInvalid);
            return;
        }
        // if email is not valid
        if (!email) {
            setErrorEmail("Email jest wymagany")
            setEmailClass(styles.inputWraperInvalid);
            return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setErrorEmail("Adres email jest nieprawidłowy");
            setEmailClass(styles.inputWraperInvalid);
            return;
        }
        setErrorEmail("");
        setEmailClass(styles.inputWraper);

        if (!password) {
            setErrorPassword("Hasło jest wymagane");
            setPasswordClass(styles.inputWraperInvalid);
            return;
        }
        if (password.length < passwordLength) {
            setErrorPassword(`Hasło musi mieć co najmniej ${passwordLength} znaków`);
            setPasswordClass(styles.inputWraperInvalid);
            return;
        }
        setErrorPassword("");
        setPasswordClass(styles.inputWraper);

        // if password and confirm password do not match
        if (password !== confirmPassword) {
            setErrorConfirmPassword("Hasła nie są takie same");
            setConfirmPasswordClass(styles.inputWraperInvalid);
            return;
        }
        setErrorConfirmPassword("");
        setConfirmPasswordClass(styles.inputWraper);
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
                if (data.success){
                    console.log("pomyslnie");
                    navigate('/logowanie'); // use navigate function here
                }
            })
            .catch((error) => {
                setErrorEmail("Email jest już zajęty")
                setEmailClass(styles.inputWraperInvalid);

            });

    };
    return (
        <>
            <Helmet>
                <title>Rejestracja</title>
            </Helmet>
            <div id={styles.appContent}>
                <div className={styles.registerPanel}>
                    <h1 className={styles.registerPanelTitle}>Rejestracja</h1>
                    <form className={styles.registerPanelForm} onSubmit={handleRegister}>
                        <label className={emailClass}>
                            <p className={styles.inputTitle}>
                                Email {errorEmail && <span className={styles.error}>{" - "+errorEmail}</span>}
                            </p>
                            <input
                                className={styles.input}
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}

                            />
                        </label>

                        <label className={passwordClass}>
                            <p className={styles.inputTitle}>
                                Hasło {errorPassword && <span className={styles.error}>{" - "+errorPassword}</span>}
                            </p>
                            <input
                                className={styles.input}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                            />
                        </label>
                        <label className={confirmPasswordClass}>
                            <p className={styles.inputTitle}>
                                Powtórz hasło {errorConfirmPassword && <span className={styles.error}>{" - "+errorConfirmPassword}</span>}
                            </p>
                            <input
                                className={styles.input}
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required={true}
                            />
                        </label>
                        <button className={styles.registerPanelButton} type="submit">Zarejestruj</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterPanel;