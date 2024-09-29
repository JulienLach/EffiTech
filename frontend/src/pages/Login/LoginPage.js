import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import GlobalStyles from "../../styles/GlobalStyles.module.css";
import LogoDesktop from "../../components/LogoDesktop/LogoDesktop";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/calendar");
    };
    
    return (
        <div className={styles.container}>
            <LogoDesktop />
            <div className={styles.loginFormCard}>
                <h1 className={styles.titleCard}>Se connecter</h1>
                <form onSubmit={handleSubmit} className={styles.formElements}>
                    <div className={styles.labelInput}>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" />
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="password">Mot de passe:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <a href="/forgot-password">Mot de passe oublié ?</a>
                    <button type="submit" className={styles.submitButton}>
                        Se connecter
                    </button>
                    <p>
                        Pas encore de compte ?{" "}
                        <a href="/create-account">Je créer mon compte</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;