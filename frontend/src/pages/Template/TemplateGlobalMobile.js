import React, { Component } from "react";
import styles from "./TemplateGlobalMobile.module.css";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";

class TemplateGlobalMobile extends Component {
    render() {
        return (
            <>
                {/* Partie header */}
                <div className={styles.headerDiv}>
                    <h1 className={styles.title}>Calendrier</h1>

                    <div className={styles.headerRight}>
                        <div className={styles.notificationIcon}>
                            <img src={bellIcon} className={styles.notificationBell}></img>
                            <span className={styles.notificationCount}>2</span>
                        </div>
                        <div className={styles.profileBubble}>JL</div>
                    </div>
                </div>

                {/* Partie bar navigation bottom */}
                <div className={styles.navbarBottom}>
                    <i className={`fas fa-list-check ${styles.navbarIcon}`}></i>
                    <i className={`fas fa-calendar ${styles.navbarIcon}`}></i>
                    <i className={`fas fa-wallet ${styles.navbarIcon}`}></i>
                    <i className={`fas fa-users ${styles.navbarIcon}`}></i>
                </div>
            </>
        );
    }
}

export default TemplateGlobalMobile;
