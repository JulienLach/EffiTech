import React, { Component } from "react";
import styles from "./EmployeeForm.module.css";
import profilPicture from "../../images/profil.png";

class EmployeeForm extends Component {
    render() {
        return (
            <>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Employé</h1>
                    <img src={profilPicture} alt="Profil picture" />
                    <div className={styles.separation}></div>
                    <h2>Coordonnées</h2>
                    <form className={styles.formElements}>
                        <div className={styles.labelInput}>
                            <label htmlFor="lastname">Nom:</label>
                            <input type="text" id="lastname" name="lastname" />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="firstname">Prénom:</label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="job">Métier:</label>
                            <input type="text" id="job" name="job" />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="speciality">Spécialité:</label>
                            <input
                                type="text"
                                id="speciality"
                                name="speciality"
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="mail">Adresse mail:</label>
                            <input type="email" id="mail" name="mail" />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="phone">Téléphone:</label>
                            <input type="text" id="phone" name="phone" />
                        </div>
                    </form>
                    <div className={styles.buttonPosition}>
                        <button type="reset" className={styles.cancelButton}>
                            Annuler
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default EmployeeForm;
