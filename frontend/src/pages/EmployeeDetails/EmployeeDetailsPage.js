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
                            <button className={styles.backButton}>
                                <i className="fa-solid fa-arrow-right"></i>
                                Retour
                            </button>
                        </div>

                        <p>[lastname] [firstname]</p>
                        <div className={styles.eventInfo}>
                            <p>[eventId] - </p>
                            <p>[clientType]</p>
                        </div>
                        <div className={styles.separation}></div>
                    </div>
                    <h2>Coordonnées</h2>
                    <div className={styles.contactInfo}>
                        <p>[job]</p>
                        <p>[speciality]</p>
                        <p>[mail]</p>
                        <p>[phone]</p>
                    </div>
                    <button className={styles.button}>
                        <i class="fa-solid fa-pen"></i>Modifier
                    </button>
                </div>
            </>
        );
    }
}

export default EmployeeDetailsPage;
