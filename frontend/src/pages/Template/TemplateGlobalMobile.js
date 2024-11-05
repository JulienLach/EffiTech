import React, { Component } from "react";
import styles from "./TemplateGlobalMobile.module.css";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";

class TemplateGlobalMobile extends Component {
    render() {
        return (
            <>
                {/* Partie header */}
                <div className={styles.header}>
                    <div className={styles.headerDiv}>
                        <div className={styles.logo}>
                            <h1>Calendrier</h1>
                        </div>
                        <div className={styles.headerRight}>
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

                {/* Partie bar navigation bottom */}
            </>
        );
    }
}

export default TemplateGlobalMobile;
