import React, { Component } from "react";
import styles from "./TemplateGlobalMobile.module.css";
import logoMobile from "../../images/iconMobile.png";
import bellIcon from "../../images/notificationBell.svg";

class TemplateGlobalMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: window.location.pathname,
            showProfileMenu: false,
            initials: "",
        };
        this.setInitials = this.setInitials.bind(this);
    }

    componentDidMount() {
        this.setInitials();
    }

    setInitials() {
        const firstname = localStorage.getItem("firstname");
        const lastname = localStorage.getItem("lastname");

        if (firstname && lastname) {
            const initials = `${firstname.charAt(0)}${lastname.charAt(
                0
            )}`.toUpperCase();
            this.setState({ initials });
        }
    }

    render() {
        const { initials, currentPath } = this.state;

        let pageTitle;
        switch (currentPath) {
            case "/calendar":
                pageTitle = "Calendrier";
                break;
            case "/calendar-mobile":
                pageTitle = "Calendrier";
                break;
            case "/clients":
                pageTitle = "Clients";
                break;
            case "/client-details/":
                pageTitle = "Détails clients";
                break;
            case "/expense":
                pageTitle = "Dépenses";
                break;
            case "/report":
                pageTitle = "Rapport";
                break;
            default:
                pageTitle = "Page";
        }

        return (
            <>
                {/* Partie header */}
                <div className={styles.headerDiv}>
                    <div className={styles.topLeftHader}>
                        <img
                            src={logoMobile}
                            alt="Logo"
                            className={styles.logoMobile}
                        />
                        <h1 className={styles.title}>{pageTitle}</h1>
                    </div>
                    <div>
                        <div className={styles.headerRight}>
                            <div className={styles.notificationIcon}>
                                <img
                                    src={bellIcon}
                                    className={styles.notificationBell}
                                    alt="Notification Bell"
                                />
                                <span
                                    className={styles.notificationCount}
                                ></span>
                            </div>
                            <div className={styles.profileBubble}>
                                {initials}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partie bar navigation bottom */}
                <div className={styles.navbarBottom}>
                    <a href="/calendar">
                        <i className={`fas fa-list ${styles.navbarIcon}`}></i>
                    </a>
                    <a href="/calendar-mobile">
                        <i
                            className={`fas fa-calendar ${styles.navbarIcon}`}
                        ></i>
                    </a>
                    <a href="/expense">
                        <i className={`fas fa-wallet ${styles.navbarIcon}`}></i>
                    </a>
                    <a href="/clients">
                        <i
                            className={`fas fa-user-group ${styles.navbarIcon}`}
                        ></i>
                    </a>
                </div>
            </>
        );
    }
}

export default TemplateGlobalMobile;
