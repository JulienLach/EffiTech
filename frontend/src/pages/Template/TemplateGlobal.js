import React, { Component } from "react";
import styles from "./TemplateGlobal.module.css";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";

class TemplateGlobal extends Component {
    render() {
        const currentPath = window.location.pathname;

        return (
            <>
                {/* Partie header */}
                <div className={styles.header}>
                    <div className={styles.headerDiv}>
                        <div className={styles.logo}>
                            <img src={logo} alt="Effitech Logo" />
                        </div>
                        <div className={styles.headerRight}>
                            <div>
                                <button className={styles.planifierButton}>
                                    <i className="fa-solid fa-plus"></i>Créer
                                </button>
                            </div>
                            <div className={styles.notificationIcon}>
                                <img
                                    src={bellIcon}
                                    className={styles.notificationBell}
                                ></img>
                                <span className={styles.notificationCount}>
                                    2
                                </span>
                            </div>
                            <div className={styles.profileBubble}>JL</div>
                        </div>
                    </div>
                </div>

                {/* Partie sidebar */}
                <div className={styles.sidebarAndOrange}>
                    <div className={styles.sidebar}>
                        <ul>
                            <li
                                className={
                                    currentPath === "/calendar"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-calendar"></i>
                                <a href="/calendar">Calendrier</a>
                            </li>
                            <li
                                className={
                                    currentPath === "/clients"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-user"></i>
                                <a href="/clients">Clients</a>
                            </li>
                            <li
                                className={
                                    currentPath === "/employees"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-users"></i>
                                <a href="/employees">Employés</a>
                            </li>
                            <li
                                className={
                                    currentPath === "/company"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-building"></i>
                                <a href="/company">Société</a>
                            </li>
                            <li
                                className={
                                    currentPath === "/invoices"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-file-lines"></i>
                                <a href="/invoices">Facture/Devis</a>
                            </li>
                            <li
                                className={
                                    currentPath === "/documents"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-folder"></i>
                                <a href="/documents">Documents</a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.sideOrange}>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>

                {/* partie container à copier pour les nouvelles pages */}
                {/* <div className={styles.container}>
                </div> */}
            </>
        );
    }
}

export default TemplateGlobal;
