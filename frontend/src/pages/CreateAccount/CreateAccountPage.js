import React, { Component } from "react";
import GlobalStyles from "../../styles/GlobalStyles.module.css";
import styles from "./CreateAccount.module.css";
import LogoDesktop from "../../components/LogoDesktop/LogoDesktop";

class CreateAccountPage extends Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel(event) {
        event.preventDefault();
        window.location.href = "/login";
    }

    handleSubmit(event) {
        event.preventDefault();
        window.location.href = "/calendar";
    }

    render() {
        return (
            <div className={styles.container}>
                <LogoDesktop />
                <div className={styles.loginFormCard}>
                    <h1 className={styles.titleCard}>Créer mon compte</h1>
                    <form className={styles.formElements}>
                        <div className={styles.labelInput}>
                            <label htmlFor="lastname">Nom:</label>
                            <input type="text" id="lastname" name="lastname" />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="firstname">Prénom:</label>
                            <input type="text" id="firstname" name="firstname" />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="email">Email:</label>
                            <input type="text" id="email" name="email" />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="phone_number">Téléphone:</label>
                            <input type="number" id="phone_number" name="phone_number" />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="password">Mot de passe:</label>
                            <input type="password" id="password" name="password" />
                        </div>
                        <div className={styles.buttonPosition}>
                            <button type="reset" onClick={this.handleCancel} className={styles.cancelButton}>Annuler</button>
                            <button type="submit" onClick={this.handleSubmit} className={styles.submitButton}>Créer mon compte</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateAccountPage;