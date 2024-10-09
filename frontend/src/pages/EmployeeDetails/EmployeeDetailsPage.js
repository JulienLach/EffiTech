import React, { Component } from "react";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./EmployeeDetailsPage.module.css";
import profilPicture from "../../images/profil.png";

class EmployeeDetailsPage extends Component {
    render() {
        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <div className={styles.profilInfo}>
                        <h1>Employé</h1>
                        <div className={styles.alignBackButton}>
                            <img src={profilPicture} alt="Profil picture" />
                            <div className={styles.names}>
                                <p className={styles.lastname}>[lastname]</p>
                                <p className={styles.firstname}>[firstname]</p>
                            </div>
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={() =>
                                    (window.location.href = "/employees")
                                }
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                                Retour
                            </button>
                        </div>
                    </div>
                    <div className={styles.separation}></div>
                    <h2>Coordonnées</h2>
                    <div className={styles.contactInfo}>
                        <p>[job]</p>
                        <p>[speciality]</p>
                        <p>[mail]</p>
                        <p>[phone]</p>
                    </div>
                    <button className={styles.button}>
                        <i className="fa-solid fa-pen"></i>Modifier
                    </button>
                </div>
            </>
        );
    }
}

export default EmployeeDetailsPage;
