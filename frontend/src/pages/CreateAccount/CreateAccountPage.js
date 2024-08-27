import React from "react";
import Header from "../.././components/Header/Header";
import GlobalStyles from "../../styles/GlobalStyles.module.css";
import styles from "./CreateAccount.module.css";
import LogoDesktop from "../../components/LogoDesktop/LogoDesktop";

const createAccountPage = () => {
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
            <label htmlFor="phone_number">Mot de passe:</label>
            <input type="number" id="phone_number" name="phone_number" />
          </div>
          <div className={styles.buttonPosition}>
            <button type="reset" className={styles.cancelButton}>Annuler</button>
            <button type="submit" className={styles.submitButton}>Créer mon compte</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default createAccountPage;
