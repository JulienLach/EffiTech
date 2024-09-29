import React from "react";
import styles from "./SidebarMenu.module.css";
import GlobalStyles from "../../styles/GlobalStyles.module.css";

const SidebarMenu = () => {
    return (
        <>
            <div className={styles.sidebarAndOrange}>
                <div className={styles.sidebar}>
                    <ul>
                        <li>
                            <i className="fa-solid fa-calendar"></i>
                            <a href="/calendar">Calendrier</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-user"></i>
                            <a href="/clients">Clients</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-users"></i>
                            <a href="/employees">Équipes</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-building"></i>
                            <a href="/company">Société</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-file-lines"></i>
                            <a href="/invoices">Facture/Devis</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-folder"></i>
                            <a href="/documents">Documents</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.sideOrange}>
                    <i className="fa-solid fa-caret-down"></i>
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;