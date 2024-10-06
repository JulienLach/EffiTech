import React, { Component } from "react";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./EmployeesPage.module.css";
import profilPicture from "../../images/profil.png";

class EmployeesPage extends Component {
    render() {
        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.profilPicture}>
                            <img src={profilPicture} alt="Profil picture" />
                        </div>
                        <div className={styles.profilInfo}>
                            <p
                                className={`${styles.lastname} ${styles.firstname}`}
                            >
                                Kylian Menuisier
                            </p>
                            <p className={styles.info}>06 63 63 63 63</p>
                            <p className={styles.info}>kiki@Dmail.gom</p>
                            <p className={styles.info}>Consulter la fiche</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.profilPicture}>
                            <img src={profilPicture} alt="Profil picture" />
                        </div>
                        <div className={styles.profilInfo}>
                            <p
                                className={`${styles.lastname} ${styles.firstname}`}
                            >
                                William Leplombier
                            </p>
                            <p className={styles.info}>06 63 63 63 63</p>
                            <p className={styles.info}>kiki@Dmail.gom</p>
                            <p className={styles.info}>Consulter la fiche</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default EmployeesPage;
